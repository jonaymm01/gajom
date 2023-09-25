import React, {useState, useContext} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {styles, palette} from '../../styles/styles';
import {DefaultQuestions} from '../../content/DefaultQuestions';
import * as Speech from 'expo-speech';

import {ProfileContext} from '../../../global';
import {addQuestion, deleteQuestion, searchQuestion} from '../../_helpers/ProfileContent';

/**
   * Método para reproducir el texto de un Pictograma
   * @param {string} text
   */
const speak = (text) => {
  Speech.speak(text);
};


/**
 * Método para renderizar página de Preguntas.
 * @return {JSX.Element}
 */
export function Questions({navigation}) {
  const [activeProfile, setProfile] = useContext(ProfileContext);
  let profile = '{}';
  if (activeProfile !== '{}') {
    profile = JSON.parse(activeProfile);
  }

  const [modalAdd, setModalAdd] = useState(false);
  const {handleSubmit, control, formState: {errors}, getValues, resetField} = useForm();
  const [newQuest, setNewQuest] = useState('');

  const [isStart, markStart] = useState(true);
  const [startWord, setStartWord] = useState('');
  const [end, setEnd] = useState('');
  const [isEnd, markEnd] = useState(false);

  const [create, toCreate] = useState(false);

  let profileButtons = [];
  let defaultButtons = [];
  let buttons = [];

  let startText = '';
  let endText = '';
  let result = '';
  let backButton =
    <View style={{height: 60, margin: 5}}>
    </View>;
  let addButton = '';

  if (isStart) {
    const questions = DefaultQuestions.questions.data;
    buttons = questions.map((question, index)=>
      <TouchableOpacity key={index} style={[questionStyles.button]} onPress={() => {
        markStart(false);
        setStartWord(question.start);
      }
      }>
        <View>
          <Text style={questionStyles.buttonText}> {question.start + '...'} </Text>
        </View>
      </TouchableOpacity>,
    );
  } else {
    const start = startWord;
    const questions = DefaultQuestions.questions.data.find((question) => question.start === start);
    if ((profile !== '{}') && (typeof(profile.questions) !== 'undefined')) {
      const profileQuestions = profile.questions.data.find((question) => question.start === start);
      if (profileQuestions !== undefined) {
        profileButtons = profileQuestions.ends.map((question, index)=>
          <View key={'profile: ' + index} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={[questionStyles.button]} onPress={() => {
              markStart(false);
              setEnd(question);
              markEnd(true);
            }}>
              <View>
                <Text style={questionStyles.buttonText}> {'...' + question} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              deleteQuest(start, question);
            }} style={questionStyles.deleteButton}>
              <Image source={require('../../../assets/trash_icon.png')} resizeMode='contain' style={{width: 30, height: 30}} />
            </TouchableOpacity>
          </View>,
        );
      }
    }
    defaultButtons = questions.ends.sort().map((question, index)=>
      <TouchableOpacity key={'default: ' + index} style={[questionStyles.button]} onPress={() => {
        markStart(false);
        setEnd(question);
        markEnd(true);
      }}>
        <View>
          <Text style={questionStyles.buttonText}> {'...' + question} </Text>
        </View>
      </TouchableOpacity>,
    );
    buttons = profileButtons.reverse().concat(defaultButtons);
    startText =
      <View>
        <Text style={questionStyles.text}> {startWord} </Text>
      </View>;
    backButton =
      <TouchableOpacity style={[questionStyles.backButton]} onPress={() => {
        setStartWord('');
        markStart(true);
        setEnd('');
        markEnd(false);
      }}>
        <View>
          <Text style={[questionStyles.smallButtonText, {lineHeight: 40}]}> ⤺ </Text>
        </View>
      </TouchableOpacity>;

    addButton =
          <TouchableOpacity style={[questionStyles.addButton]} onPress={() => {
            (profile === '{}') ? navigation.navigate("profile") :  toCreate(true);
          }}>
            <View>
              <Text style={[questionStyles.smallButtonText, {fontSize: 20, textAlign: 'justify'}]}>{(profile === '{}') ? 'Inicia sesión para añadir' : '+'}</Text>
            </View>
          </TouchableOpacity>;
  }

  if (isEnd) {
    endText =
      <View>
        <Text style={questionStyles.text}> {end} </Text>
      </View>;
  }

  if (!isStart) {
    const finalQuestion = startWord + ((startWord !== '¿') ? ' ' : '') + ((end.length > 0) ? end : '...');
    result =
      <View style={{marginBottom: 10, alignItems: 'center'}}>
        <Text style={[styles.basic_font, {fontStyle: 'italic'}]}>{isEnd ? '🕪  Pulsa para escuchar' : ''}</Text>
        <TouchableOpacity style={[questionStyles.defButton]} onPress={() => {
          speak(finalQuestion);
        }}>
          <View>
            <Text style={questionStyles.buttonText}>{finalQuestion}</Text>
          </View>
        </TouchableOpacity>
      </View>;
  }

  const alreadyExist = async () => {
    const newEnd = getValues().add + '?';
    const response = await searchQuestion(profile.name, startWord, newEnd);
    return response;
  }

  const add = async (value) => {
    const addedEnd = getValues().add;
    const question = startWord + ' ' + addedEnd + '?';
    const newEnd = addedEnd + '?';
      addQuestion(profile.name, startWord, newEnd).then(() => {
        setEnd(newEnd);
        markEnd(true);
        AsyncStorage.getItem(profile.name).then((modified) => setProfile(modified));
      });
      toCreate(false);
  setNewQuest('');
  resetField('add');
  };

  const deleteQuest = async (start, end) => {
    await deleteQuestion(profile.name, start, end);
    const modified = await AsyncStorage.getItem(profile.name);
    setProfile(modified);
    console.log('Se ha eliminado la pregunta: ', start + ' ' + end);
  };

  if (!create) {
    return (
      <View style={styles.blank_background}>
        <View style={isStart ? {flex: -1} : {flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <>
            {backButton}
          </>
          <>
            {result}
          </>
        </View>
        <View style={isStart ? {flex: 0} : {flex: 5}}>
          <View style={{width: 300, marginTop: 30}}>
            <>
              {addButton}
            </>
          </View>
          <ScrollView persistentScrollbar={isStart ? true : false} showsVerticalScrollIndicator={true} style={{flex: 3}}>
            {buttons}
          </ScrollView>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{backgroundColor: 'white', flex: 1, justifyContent: 'center', padding: 20, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', maxWidth: 200, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: '#fff', backgroundColor: palette.violet, padding: 10, margin: 10}]}>{startWord} </Text>
          <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: palette.violet, backgroundColor: '#fff', padding: 10, margin: 10, borderColor: palette.violet, borderWidth: 2, flexWrap: 'wrap'}]}>{newQuest}</Text>
          <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: '#fff', backgroundColor: palette.violet, padding: 10, margin: 10}]}>?</Text>
        </View>
        <Text style={[styles.title, {marginBottom: 20, marginTop: 20, color: palette.violet}]}>Completa la pregunta</Text>
        <Controller
          name="add"
          defaultValue=""
          control={control}
          rules={{
            required: {value: true, message: 'Escribe el resto de la pregunta'},
          }}
          render={({field: {onChange, value}}) => (
            <Input
              maxLength={30}
              error={errors.name}
              errorText={errors?.name?.message}
              onChangeText={(text) => {
                setNewQuest(text);
                onChange(text);
              }}
              value={value}
              placeholder={'...'}
              autoCapitalize="none"
            />
          )}
        />
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={[creatorStyles.button, creatorStyles.grayBackground]}
            onPress={() => {
              resetField('add');
              toCreate(false);
            }}
          >
            <Text style={creatorStyles.textStyle}>Cancelar</Text>
          </Pressable>
          <Pressable
            style={[creatorStyles.button, creatorStyles.violetBackground]}
            onPress={() => {
              if ((getValues().add !== '') && (getValues().add !== undefined)) {
              alreadyExist().then((isDuplicate) => 
              {
                if(!isDuplicate) {
                  add();
                } else {
                  Alert.alert('¡Ups!', 'Ya tienes esta pregunta.', [
                    {text: 'OK'},
                  ],
                  {
                    cancelable: true,
                  });
                }
              });
            } else {
              Alert.alert('¡Ups!', 'Aún no has escrito ninguna pregunta.', [
                {text: 'OK'},
              ],
              {
                cancelable: true,
              }); ;
            }
            }}
          >
            <Text style={creatorStyles.textStyle}>Aplicar</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

export const questionStyles = StyleSheet.create({
  buttonText: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  smallButtonText: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
  },
  button: {
    backgroundColor: palette.violet,
    margin: 5,
    height: 80,
    width: 300,
    justifyContent: 'center',
    padding: 15,
  },
  addButton: {
    backgroundColor: palette.gray,
    margin: 5,
    marginBottom: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
    elevation: 10,
  },
  defButton: {
    backgroundColor: palette.red,
    margin: 5,
    padding: 15,
    width: 250,
    height: 80,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 10,
  },
  backButton: {
    backgroundColor: palette.gray,
    height: 60,
    width: 60,
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 20,
  },
});

const creatorStyles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: 150,
    height: 80,
    elevation: 10,
    margin: 15,
  },
  violetBackground: {
    backgroundColor: palette.violet,
  },
  grayBackground: {
    backgroundColor: palette.gray,
  },
  redBackground: {
    backgroundColor: palette.red,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 80,
    fontSize: 25,
  },
  modalText: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

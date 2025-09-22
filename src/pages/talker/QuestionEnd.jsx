import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {styles, palette, dp} from '../../styles/styles';
import {DefaultQuestions} from '../../content/DefaultQuestions';
import Tts from 'react-native-tts';

import {ProfileContext} from '../../../global';
import {
  addQuestion,
  deleteQuestion,
  searchQuestion,
} from '../../_helpers/ProfileContent';

import Icon from 'react-native-vector-icons/Ionicons';

/**
 * Método para reproducir el texto de un Pictograma
 * @param {string} text
 */
const speak = text => {
  Tts.speak(text);
};

/**
 * Método para renderizar página de Preguntas.
 * @return {JSX.Element}
 */
export function QuestionEnd({route, navigation}) {
  const [activeProfile, setProfile] = useContext(ProfileContext);
  let profile = '{}';
  if (activeProfile !== '{}') {
    profile = JSON.parse(activeProfile);
  }

  const [modalAdd, setModalAdd] = useState(false);
  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
    resetField,
  } = useForm();
  const [newQuest, setNewQuest] = useState('');

  const [end, setEnd] = useState('');

  const {itemId, start} = route.params;

  let backButton = <View style={{height: dp(60), margin: dp(5)}}></View>;

  let profileButtons = [];
  let buttons = [];

  const questions = DefaultQuestions.questions.data.find(
    question => question.start === start,
  );
  if (profile !== '{}' && typeof profile.questions !== 'undefined') {
    const profileQuestions = profile.questions.data.find(
      question => question.start === start,
    );
    if (profileQuestions !== undefined) {
      profileButtons = profileQuestions.ends.map((question, index) => (
        <View
          key={'profile: ' + index}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={[questionStyles.button]}
            onPress={() => {
              speak(question);
              setEnd(question);
            }}>
            <View>
              <Text style={questionStyles.buttonText}>
                {' '}
                {'...' + question}{' '}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteQuest(start, question);
            }}
            style={questionStyles.deleteButton}>
            <Image
              source={require('../../../assets/trash_icon.png')}
              resizeMode="contain"
              style={{width: dp(30), height: dp(30), marginLeft: dp(8)}}
            />
          </TouchableOpacity>
        </View>
      ));
    }
  }
  defaultButtons = questions.ends.sort().map((question, index) => (
    <TouchableOpacity
      key={'default: ' + index}
      style={[questionStyles.button]}
      onPress={() => {
        speak(question);
        setEnd(question);
      }}>
      <View>
        <Text style={questionStyles.buttonText}> {'...' + question} </Text>
      </View>
    </TouchableOpacity>
  ));
  buttons = profileButtons.reverse().concat(defaultButtons);
  startText = (
    <View>
      <Text style={questionStyles.text}> {start} </Text>
    </View>
  );
  backButton = (
    <TouchableOpacity
      style={[questionStyles.backButton]}
      onPress={() => {
        navigation.navigate('Questions');
      }}>
      <View>
        <Icon name="arrow-undo-outline" size={dp(40)} color={palette.gray} />
      </View>
    </TouchableOpacity>
  );

  const getQuestionIcon = () => {
    switch (start) {
      case '¿Cuándo':
        return require('../../../assets/questIcons/cuandoIcon.png');
      case '¿Dónde':
        return require('../../../assets/questIcons/dondeIcon.png');
      case '¿Qué':
        return require('../../../assets/questIcons/queIcon.png');
      case '¿Cómo':
        return require('../../../assets/questIcons/comoIcon.png');
      case '¿Quién':
        return require('../../../assets/questIcons/quienIcon.png');
      case '¿':
        return require('../../../assets/questIcons/anyIcon.png');
      default:
        return '';
    }
  };

  const addButton = (
    <TouchableOpacity
      style={[questionStyles.addButton]}
      onPress={() => {
        profile === '{}'
          ? navigation.navigate('profile')
          : setModalAdd(!modalAdd);
      }}>
      <View>
        <Text
          style={[
            questionStyles.smallButtonText,
            {fontSize: dp(20), textAlign: 'justify'},
          ]}>
          {profile === '{}' ? 'Inicia sesión para añadir' : '+'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  endText = (
    <View>
      <Text style={questionStyles.text}> {end} </Text>
    </View>
  );

  const finalQuestion =
    start + (start !== '¿' ? ' ' : '') + (end.length > 0 ? end : '...');

  const result = (
    <View
      style={{
        marginBottom: dp(10),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={[styles.basic_font, {fontStyle: 'italic'}]}>
        Pulsa para escuchar
      </Text>
      <TouchableOpacity
        style={[questionStyles.defButton]}
        onPress={() => {
          speak(finalQuestion);
        }}>
        <View>
          <Text style={questionStyles.buttonText}>{finalQuestion}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const alreadyExist = async () => {
    const newEnd = getValues().add + '?';
    const response = await searchQuestion(profile.name, start, newEnd);
    return response;
  };

  const add = async value => {
    const addedEnd = getValues().add;
    const question = start + ' ' + addedEnd + '?';
    const newEnd = addedEnd + '?';
    addQuestion(profile.name, start, newEnd).then(() => {
      setEnd(newEnd);
      AsyncStorage.getItem(profile.name).then(modified => setProfile(modified));
    });
    setModalAdd(!modalAdd);
    setNewQuest('');
    resetField('add');
  };

  const deleteQuest = async (start, questEnd) => {
    await deleteQuestion(profile.name, start, questEnd);
    const modified = await AsyncStorage.getItem(profile.name);
    setProfile(modified);
    end == questEnd ? setEnd('') : null;
    console.log('Se ha eliminado la pregunta: ', start + ' ' + questEnd);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        padding: dp(10),
        alignItems: 'center',
      }}>
      <Modal
        animationType="fade"
        visible={modalAdd}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalAdd(!modalAdd);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              maxWidth: dp(200),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                styles.title,
                {
                  marginBottom: dp(20),
                  marginTop: dp(40),
                  color: '#fff',
                  backgroundColor: palette.violet,
                  padding: dp(10),
                  margin: dp(10),
                },
              ]}>
              {start}{' '}
            </Text>
            <Text
              style={[
                styles.title,
                {
                  marginBottom: dp(20),
                  marginTop: dp(40),
                  color: palette.violet,
                  backgroundColor: '#fff',
                  padding: dp(10),
                  margin: dp(10),
                  borderColor: palette.violet,
                  borderWidth: dp(2),
                  flexWrap: 'wrap',
                  textAlign: 'center',
                },
              ]}>
              {newQuest}
            </Text>
            <Text
              style={[
                styles.title,
                {
                  marginBottom: dp(20),
                  marginTop: dp(40),
                  color: '#fff',
                  backgroundColor: palette.violet,
                  padding: dp(10),
                  margin: dp(10),
                },
              ]}>
              ?
            </Text>
          </View>
          <Text
            style={[
              styles.title,
              {
                marginBottom: dp(20),
                marginTop: dp(20),
                color: palette.violet,
                fontSize: dp(25),
              },
            ]}>
            Completa la pregunta
          </Text>
          <Controller
            name="add"
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Escribe el resto de la pregunta',
              },
            }}
            render={({field: {onChange, value}}) => (
              <Input
                multiline
                textAlign={'center'}
                maxLength={30}
                error={errors.name}
                errorText={errors?.name?.message}
                onChangeText={text => {
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
                setModalAdd(!modalAdd);
              }}>
              <Text style={creatorStyles.textStyle}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[creatorStyles.button, creatorStyles.violetBackground]}
              onPress={() => {
                if (getValues().add !== '' && getValues().add !== undefined) {
                  alreadyExist().then(isDuplicate => {
                    if (!isDuplicate) {
                      add();
                    } else {
                      Alert.alert(
                        '¡Ups!',
                        'Ya tienes esta pregunta.',
                        [{text: 'OK'}],
                        {
                          cancelable: true,
                        },
                      );
                    }
                  });
                } else {
                  Alert.alert(
                    '¡Ups!',
                    'Aún no has escrito ninguna pregunta.',
                    [{text: 'OK'}],
                    {
                      cancelable: true,
                    },
                  );
                }
              }}>
              <Text style={creatorStyles.textStyle}>Aplicar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={[styles.blank_background, {width: '100%'}]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
            justifyContent: 'center',
          }}>
          {result}
        </View>
        <View style={{flex: 5}}>
          <View style={{width: 300, marginTop: 30}}>
            <>{addButton}</>
          </View>
          <ScrollView
            persistentScrollbar={false}
            showsVerticalScrollIndicator={false}
            style={{flex: 3}}>
            {buttons}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export const questionStyles = StyleSheet.create({
  buttonText: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: dp(20),
  },
  smallButtonText: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: dp(40),
  },
  button: {
    backgroundColor: palette.violet,
    margin: dp(5),
    minHeight: dp(80),
    maxHeight: dp(120),
    width: dp(300),
    justifyContent: 'center',
    padding: dp(15),
    borderRadius: dp(5),
  },
  addButton: {
    backgroundColor: palette.gray,
    margin: dp(5),
    marginBottom: dp(20),
    height: dp(50),
    width: dp(300),
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: dp(5),
  },
  defButton: {
    backgroundColor: palette.darkViolet,
    margin: dp(5),
    minHeight: dp(80),
    maxHeight: dp(120),
    width: dp(300),
    justifyContent: 'center',
    padding: dp(15),
    borderRadius: dp(5),
  },
  backButton: {
    justifyContent: 'center',
    marginTop: dp(20),
    marginLeft: dp(20),
  },
  text: {
    fontSize: dp(30),
  },
  title: {
    fontSize: dp(25),
    fontWeight: 'bold',
    margin: dp(20),
  },
});

const creatorStyles = StyleSheet.create({
  button: {
    borderRadius: dp(10),
    width: dp(150),
    height: dp(80),
    margin: dp(15),
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
    lineHeight: dp(80),
    fontSize: dp(25),
  },
  modalText: {
    marginBottom: dp(40),
    textAlign: 'center',
    fontSize: dp(24),
    marginTop: dp(20),
    fontWeight: 'bold',
  },
});

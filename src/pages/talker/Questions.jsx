import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {styles, palette} from '../../styles/styles';
import {DefaultQuestions} from '../../content/DefaultQuestions';
import * as Speech from 'expo-speech';

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
export function Questions() {
  const [isStart, markStart] = useState(true);
  const [startWord, setStartWord] = useState('');
  const [end, setEnd] = useState('');
  const [isEnd, markEnd] = useState(false);

  let buttons = [];
  let startText = '';
  let endText = '';
  let result = '';
  let backButton =
    <View style={{height: 60, margin: 5}}>
    </View>;

  if (isStart) {
    const questions = DefaultQuestions.data.questions;
    buttons = questions.map((question)=>
      <TouchableOpacity style={[questionStyles.button]} onPress={() => {
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
    const questions = DefaultQuestions.data.questions.find((question) => question.start === start);
    buttons = questions.ends.map((question)=>
      <TouchableOpacity style={[questionStyles.button]} onPress={() => {
        markStart(false);
        setEnd(question);
        markEnd(true);
      }}>
        <View>
          <Text style={questionStyles.buttonText}> {'...' + question} </Text>
        </View>
      </TouchableOpacity>,
    );
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
  }

  if (isEnd) {
    endText =
      <View>
        <Text style={questionStyles.text}> {end} </Text>
      </View>;
  }

  const finalQuestion = startWord + ' ' + end;
  result =
      <View style={{marginBottom: 60, marginTop: 60, alignItems: 'center'}}>
        <Text style={[styles.basic_font, {fontStyle: 'italic'}]}>{isEnd ? 'Pulsa para escuchar el resultado' : ''}</Text>
        <TouchableOpacity style={[questionStyles.defButton]} onPress={() => {
          speak(finalQuestion);
        }}>
          <View>
            <Text style={questionStyles.buttonText}> {finalQuestion} </Text>
          </View>
        </TouchableOpacity>
      </View>;

  return (
    <View style={styles.blank_background}>
      <>
        {result}
      </>
      <View style={{flex: 2}}>
        <View style={{flexDirection: 'row', width: 300}}>
          <>
            {backButton}
          </>
          <Text style={[styles.basic_font, {fontStyle: 'italic', alignSelf: 'center'}]}>{isStart ? 'Construye tu pregunta' : ''}</Text>
        </View>
        <ScrollView style={{flex: 3}}>
          {buttons}
        </ScrollView>
      </View>
    </View>
  );
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
  },
  defButton: {
    backgroundColor: palette.red,
    margin: 5,
    height: 80,
    width: 300,
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
    margin: 5,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignSelf: 'flex-start',
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

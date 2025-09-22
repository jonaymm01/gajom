import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

import {palette, dp} from '../../styles/styles';
import {fqaContent} from '../../content/fqaContent';

/**
 * Método para renderizar página de Preguntas Frecuentes.
 * @return {JSX.Element}
 */
export function FQA({route, navigation}) {
  let questList = [];
  const {itemId, quest} = route.params;

  switch (quest) {
    case 'profile':
      questList = fqaContent.profile;
      break;
    case 'talker':
      questList = fqaContent.talker;
      break;
    case 'fqa':
      questList = fqaContent.fqa;
      break;
  }

  const leftSignals = ['PICTOS', 'TAPS', 'PREGUNTADOR', '¡DICTA!'];

  const content = questList.map((question, index) => (
    <View
      key={index}
      style={
        leftSignals.includes(question.question) ? styles.boxStart : styles.box
      }>
      <Text
        style={
          leftSignals.includes(question.question)
            ? styles.questionStart
            : styles.question
        }>
        {question.question}
      </Text>
      <Text
        style={
          leftSignals.includes(question.question)
            ? styles.answerStart
            : styles.answer
        }>
        {question.answer}
      </Text>
    </View>
  ));

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>{content}</View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 40,
  },
  box: {
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    padding: 20,
    borderColor: palette.violet,
    borderWidth: 2,
  },
  boxStart: {
    backgroundColor: palette.violet,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    padding: 20,
    borderColor: palette.violet,
    borderWidth: 2,
  },
  question: {
    fontSize: dp(20),
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -40,
    backgroundColor: palette.violet,
    borderColor: palette.violet,
    borderWidth: 2,
    padding: 10,
    color: '#fff',
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
  questionStart: {
    fontSize: dp(20),
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -40,
    backgroundColor: '#fff',
    borderColor: palette.violet,
    borderWidth: 2,
    padding: 10,
    color: palette.violet,
    alignSelf: 'flex-start',
    textAlign: 'center',
  },
  answer: {
    fontSize: dp(18),
    textAlign: 'left',
    color: palette.violet,
  },
  answerStart: {
    fontSize: dp(20),
    textAlign: 'left',
    color: '#fff',
    fontWeight: 'bold',
  },
});

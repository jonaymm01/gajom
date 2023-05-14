import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

import {palette} from '../../styles/styles';
import {fqaContent} from '../../content/fqaContent';

/**
 * Método para renderizar página de Preguntas Frecuentes.
 * @return {JSX.Element}
 */
export function FQA() {

  const content = fqaContent.map((question, index) => 
  <View key={index} style={styles.box}>
    <Text style={styles.question}>{question.question}</Text>
    <Text style={styles.answer}>{question.answer}</Text>
  </View>,
  );

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        {content}
      </View>
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
    borderColor: '#000',
    borderWidth: 2,
    elevation: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -40,
    backgroundColor: palette.violet,
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    color: '#fff',
    alignSelf: 'flex-end',

  },
  answer: {
    fontSize: 18,
    textAlign: 'left',
    color: palette.violet,
  }
});

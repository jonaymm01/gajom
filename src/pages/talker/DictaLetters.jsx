import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {palette, styles} from '../../styles/styles';
import * as Speech from 'expo-speech';

/**
 * Método para reproducir el número
 * @param {string} text
 */
const speak = (letter) => {
  let l = letter;
  switch(letter) {
    case 'Ñ': 
      l = 'eñe';
      break;
    case 'Y': 
      l = 'ye';
      break;  
  }
  Speech.speak(l);
};

/**
 * Método para renderizar página de dictar números.
 * @return {JSX.Element}
 */
export function DictaLetters() {  

  const letters1 = ['A', 'B', 'C', 'D'];
  const letters2 = ['E', 'F', 'G', 'H'];
  const letters3 = ['I', 'J', 'K', 'L'];
  const letters4 = ['M', 'N', 'Ñ', 'O'];
  const letters5 = ['P', 'Q', 'R', 'S'];
  const letters6 = ['T', 'U', 'V', 'W'];
  const letters7 = ['X', 'Y', 'Z'];
  const letters = [letters1, letters2, letters3, letters4, letters5, letters6, letters7];

  const letterRow = (list) => list.map( (letter, index) =>
    <>
      <TouchableOpacity key={'row:'+index} style={talkerStyles.button} onPress={() => speak(letter)}>
            <View key={'row:'+index} style={styles.button_container}>
              <Text key={'row:'+index} style={talkerStyles.button_text}> {letter} </Text>
            </View>
        </TouchableOpacity>
    </>
  )

  const lettersRows = letters.map((list, index) => 
    <View key={'rows:'+index} style= {{flex: 1,backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center'}}>
      {letterRow(list)}
    </View>
  )

  return (
    <View style={{flex: 1}}>
      {lettersRows}
    </View>
  );
}

const talkerStyles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: palette.violet,
    margin: 2,
    borderRadius: 10,
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
});

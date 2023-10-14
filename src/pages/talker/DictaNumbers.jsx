import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Pressable, Image} from 'react-native';
import {palette, styles, dp} from '../../styles/styles';
import * as Speech from 'expo-speech';

/**
 * Método para reproducir el número
 * @param {string} text
 */
const speak = (letter) => {
  let l = letter;
  switch(letter) {
    case '5504042355': 
      l = '¿Qué somos?';
      break;
  }
  Speech.speak(l);
};

/**
 * Método para deletrear el número
 * @param {string} text
 */
const spell = (letter) => {
  let l = letter.split('');
  Speech.speak(l.join(' '));
};

/**
 * Método para renderizar página de dictar números.
 * @return {JSX.Element}
 */
export function DictaNumbers() {  

  const [word, setWord] = useState('');

  const letters1 = ['1', '2', '3'];
  const letters2 = ['4', '5', '6'];
  const letters3 = ['7', '8', '9'];
  const letters = [letters1, letters2, letters3];

  const letterRow = (list) => list.map( (letter, index) =>
    <TouchableOpacity key={'row:'+index} style={talkerStyles.button} onPress={() => {setWord(word+letter); speak(letter)}}>
          <View key={'row:'+index} style={styles.button_container}>
            <Text key={'row:'+index} style={talkerStyles.button_text}> {letter} </Text>
          </View>
      </TouchableOpacity>
  )

  const lettersRows = letters.map((list, index) => 
    <View key={'rows:'+index} style= {{flex: 1,backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center'}}>
      {letterRow(list)}
    </View>
  )

  const deleteButton = 
    <TouchableOpacity
        style={[talkerStyles.button, {backgroundColor: palette.gray}]}
        onPress={() => {
          setWord('');
        }}
      >
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image source={require('../../../assets/trash_icon.png')} tintColor={'#fff'} resizeMode='contain' style={{maxWidth: dp(40), maxHeight: dp(40), alignSelf: 'center'}} />
      </View>
    </TouchableOpacity>

const deleteLastButton = 
<TouchableOpacity
    style={[talkerStyles.button, {backgroundColor: palette.gray}]}
    onPress={() => {
      setWord(word.slice(0, -1));
    }}
  >
  <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <Text style={[{fontSize: dp(40), color: '#fff', fontWeight: '500'}]}> ⌫ </Text>
  </View>
</TouchableOpacity>

const sayWordButton = 
<TouchableOpacity
    style={[talkerStyles.button, {backgroundColor: palette.darkViolet}]}
    onPress={() => {
      speak(word);
    }}
  >
  <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <Text style={{fontSize: dp(25), color: '#fff', fontWeight: '500'}}>LEER ENTERO</Text>
  </View>
</TouchableOpacity>

const spellButton = 
<TouchableOpacity
    style={[talkerStyles.button, {backgroundColor: palette.darkViolet}]}
    onPress={() => {
      spell(word);
    }}
  >
  <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <Text style={{fontSize: dp(25), color: '#fff', fontWeight: '500'}}>DELETREO</Text>
  </View>
</TouchableOpacity>

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={talkerStyles.word}> {(word == '') ? '¡Escribe tu número!' : word} </Text>
      </View>
      {lettersRows}
      <View style= {{flex: 1,backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center'}}>
        {deleteButton}
        <TouchableOpacity style={talkerStyles.button} onPress={() => {setWord(word+'0'); speak('0')}}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}> 0 </Text>
          </View>
        </TouchableOpacity>
        {deleteLastButton}
      </View>
      <View style= {{flex: 1,backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center'}}>
        {spellButton}
        {sayWordButton}
      </View>
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
    fontSize: dp(40),
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
  word: {
    color: palette.violet,
    fontSize: dp(30),
    fontWeight: 'bold',
  }
});

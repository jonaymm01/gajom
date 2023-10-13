import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Pressable, Image} from 'react-native';
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

  const [word, setWord] = useState('');

  const letters1 = ['A', 'B', 'C', 'D'];
  const letters2 = ['E', 'F', 'G', 'H'];
  const letters3 = ['I', 'J', 'K', 'L'];
  const letters4 = ['M', 'N', 'Ñ', 'O'];
  const letters5 = ['P', 'Q', 'R', 'S'];
  const letters6 = ['T', 'U', 'V', 'W'];
  const letters7 = ['X', 'Y', 'Z'];
  const letters = [letters1, letters2, letters3, letters4, letters5, letters6, letters7];

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
        <Image source={require('../../../assets/trash_icon.png')} tintColor={'#fff'} resizeMode='contain' style={{maxWidth: 40, maxHeight: 40, margin: 10, alignSelf: 'center'}} />
    </TouchableOpacity>

const deleteLastButton = 
<TouchableOpacity
    style={[talkerStyles.button, {backgroundColor: palette.gray}]}
    onPress={() => {
      setWord(word.slice(0, -1));
    }}
  >
  <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <Text style={{fontSize: 40, color: '#fff', fontWeight: '500'}}>⌫</Text>
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
    <Text style={{fontSize: 25, color: '#fff', fontWeight: '500'}}>LEER</Text>
  </View>
</TouchableOpacity>

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={talkerStyles.word}> {(word == '') ? '¡Deletrea tu palabra!' : word} </Text>
      </View>
      {lettersRows}
      <View style={{flex:1, flexDirection: 'row'}}>
        {deleteButton}
        {sayWordButton}
        {deleteLastButton}
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
    fontSize: 40,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
  word: {
    color: palette.violet,
    fontSize: 30,
    fontWeight: 'bold',
  }
});

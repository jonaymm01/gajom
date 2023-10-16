// Button.js
import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import {styles, palette, dp} from '../styles/styles';
import {DefaultPictos} from '../content/DefaultPictos';
import * as Speech from 'expo-speech';

/**
   * Método para reproducir el texto de un Pictograma
   * @param {string} text
   */
const speak = (text) => {
  switch(text) {
    case '0 -':
      text = '0 negativo';
      break;
    case '0 +':
      text = '0 positivo';
      break;
    case 'A -':
      text = 'A negativo';
      break;
    case 'A +':
      text = 'A positivo';
      break;
    case 'B -':
      text = 'B negativo';
      break;
    case 'B +':
      text = 'B positivo';
      break;
    case 'AB -':
      text = 'A B negativo';
      break;
    case 'AB +':
      text = 'A B positivo';
      break;
    case 'ETS':
      text = 'E T S';
      break;
    case 'VIH':
      text = 'V I H';
      break;
    case 'HPV':
      text = 'H P V';
      break;
  }
  Speech.speak(text);
};

/**
 * Componente: Botón.
 * @param {*} {label, ...props}
 * @return {JSX.Element}
 */
export default function Pictogram({...props}) {
  const oneWord = (props.data.name.trim().indexOf(' ') == -1) ? true : false;
  const otrosKeys = ['Otro', 'Otra', 'Otros', 'Otras', 'Todos'];
  if (props.data.hasOwnProperty('img')) {
    return (
      <TouchableOpacity style={((props.data.content.length > 0) ? pictoStyles.baseNoTerminal : pictoStyles.baseTerminal)} onPress={() => {speak(props.data.name); props.setPressed(props.data.name); props.setText(props.data.text)}}>
        <Image source={props.data.img} resizeMode='contain' style={pictoStyles.img} backgroundColor={'#fff'} />
        <Text numberOfLines={(oneWord) ? 1 : 2} adjustsFontSizeToFit style={((props.data.content.length > 0) ?  pictoStyles.textNoTerminal : pictoStyles.textTerminal)}>{props.data.name}</Text>
      </TouchableOpacity>
    );
  } else {
      return (
        <TouchableOpacity style={[((props.data.content.length > 0) ? pictoStyles.baseNoTerminal : pictoStyles.baseTerminal), ((otrosKeys.includes(props.data.name) == true) ? {borderRadius: 100} : null)]} onPress={() => {speak(props.data.name); props.setPressed(props.data.name); props.setText(props.data.text)}}>
          <Text numberOfLines={(oneWord) ? 1 : 2} adjustsFontSizeToFit style={[((props.data.content.length > 0) ?  pictoStyles.textNoTerminal : pictoStyles.textTerminal), {fontSize: dp(25)}]}>{props.data.name}</Text>
        </TouchableOpacity>
      );
  }

}

export const pictoStyles = StyleSheet.create({
  baseNoTerminal: {
    height: dp(180),
    width: dp(160),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: palette.violet,
    borderWidth: dp(5),
    borderRadius: dp(40),
    padding: dp(10),
    margin: dp(10),
  },
  baseTerminal: {
    height: dp(180),
    width: dp(160),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: palette.darkViolet,
    borderWidth: dp(5),
    borderRadius: dp(10),
    padding: dp(10),
    margin: dp(10),
  },
  textNoTerminal: {
    color: palette.violet,
    fontSize: dp(20),
    fontWeight: 'bold',
    textAlign: 'center',
    padding: dp(5),
  },
  textTerminal: {
    color: palette.darkViolet,
    fontSize: dp(20),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  img: {
    flex: 1,
    maxWidth: dp(100),
    maxHeight: dp(100),
    borderRadius: dp(10),
  },
});

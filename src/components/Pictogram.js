// Button.js
import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import {styles, palette} from '../styles/styles';
import {DefaultPictos} from '../content/DefaultPictos';
import * as Speech from 'expo-speech';

/**
   * Método para reproducir el texto de un Pictograma
   * @param {string} text
   */
const speak = (text) => {
  Speech.speak(text);
};

/**
 * Componente: Botón.
 * @param {*} {label, ...props}
 * @return {JSX.Element}
 */
export default function Pictogram({...props}) {
  return (
    <TouchableOpacity style={((props.data.content.length > 0) ? pictoStyles.baseNoTerminal : pictoStyles.baseTerminal)} onPress={() => {speak(props.data.name); props.setPressed(props.data.name)}}>
      <Text style={pictoStyles.text}>{props.data.name}</Text>
      <Image source={props.data.img} resizeMode='contain' style={pictoStyles.img} backgroundColor={'#fff'} />
    </TouchableOpacity>
  );
}

export const pictoStyles = StyleSheet.create({
  baseNoTerminal: {
    height: 160,
    width: 160,
    alignItems: 'center',
    backgroundColor: palette.violet,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  baseTerminal: {
    height: 160,
    width: 160,
    alignItems: 'center',
    backgroundColor: palette.gray,
    borderRadius: 0,
    padding: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  img: {
    flex: 1,
    maxWidth: 120,
    maxHeight: 120,
    borderRadius: 10,
  },
});

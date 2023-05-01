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
    <TouchableOpacity style={[pictoStyles.base]} onPress={() => speak(props.text)}>
      <Text style={pictoStyles.text}>{props.text}</Text>
      <Image source={props.img} resizeMode='contain' style={pictoStyles.img} />
    </TouchableOpacity>
  );
}

export const pictoStyles = StyleSheet.create({
  base: {
    height: 160,
    width: 150,
    alignItems: 'center',
    backgroundColor: palette.violet,
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  img: {
    flex: 1,
    height: 90,
    width: 120,
    borderRadius: 20,
  },
});

import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {styles, palette} from '../styles/styles';
import * as Speech from 'expo-speech';

/**
 * Método para renderizar lista de botones
 * @return {JSX.Element}
 */
export default function TOList({...props}) {
  /**
   * Método para activar la lectura de texto del TAP
   * @param {string} text
   */
  const speak = (text) => {
    Speech.speak(text);
  };

  const taplist = props.list.map((tap) =>
    <TouchableOpacity style={[styles.button, {backgroundColor: tap.color}]} onPress={()=>speak(tap.text)}>
      <View style={styles.button_container}>
        <Text style={talkerStyles.button_text}>{tap.text}</Text>
      </View>
    </TouchableOpacity>,
  );
  return (
    <>
      {taplist}
    </>
  );
}


const talkerStyles = StyleSheet.create({
  box: {
    alignItems: 'center',
    height: 100,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    textAlign: 'justify',
    color: palette.violet,
    lineHeight: 100,
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
  },
});


import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {styles, palette} from '../styles/styles';

/**
 * Método para renderizar el menú de Soporte.
 * @param {*} navigation
 * @return {JSX.Element}
 */
export function Support( {navigation} ) {
  const onPressFQA = () => navigation.navigate('FQA');
  const onPressContact = () => navigation.navigate('Contact');

  return (
    <View style={[styles.container, {flexDirection: 'column', padding: 0}]}>
      <TouchableOpacity style={[styles.button, {backgroundColor: palette.red}]} onPress={onPressFQA}>
        <View style={styles.button_container}>
          <Text style={styles.button_text}>PREGUNTAS FRECUENTES</Text>
          <Image source={require('../../assets/fyqIcon.png')} resizeMode='contain' style={{flex: 1, marginBottom: 60}} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {backgroundColor: palette.red}]} onPress={onPressContact}>
        <View style={styles.button_container}>
          <Text style={styles.button_text}>CONTACTA CON NOSOTROS</Text>
          <Image source={require('../../assets/phoneIcon.png')} resizeMode='contain' style={{flex: 1, marginBottom: 60}} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

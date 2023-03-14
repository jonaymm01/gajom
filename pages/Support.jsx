
import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, Linking} from 'react-native';
import { styles } from '../styles/styles';

export function Support() {
  const onPressFQA = () => navigation.navigate("Soporte")
  const onPressContact = () => navigation.navigate("Mi perfil")
  const logopedazo_content = `La afonia es perder por completo la voz. La disfonía, pérdida parcial. ¿Voz de camionero post-fiesta? No estás afónico... ¡estás disfónico!`
  const logopedazo_url = 'https://es.wikipedia.org/wiki/Disfon%C3%ADa';
  const onPressLogopedazo = () => Linking.openURL(logopedazo_url);
    return (
    <View style={[ styles.container, {flexDirection: 'column', padding: 0}]}>
        <TouchableOpacity  style={[styles.button, {backgroundColor: '#AC3C60'}]} onPress={onPressFQA}>
          <View style={styles.button_container}>
            <Text style={styles.button_text}>PREGUNTAS FRECUENTES</Text>
            <Image source={require('../assets/fyqIcon.png')} resizeMode='contain' style={{flex:1, marginBottom: 60}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.button, {backgroundColor: '#AC3C60'}]} onPress={onPressContact}>
          <View style={styles.button_container}>
            <Text style={styles.button_text}>CONTACTA CON NOSOTROS</Text>
            <Image source={require('../assets/phoneIcon.png')} resizeMode='contain' style={{flex:1, marginBottom: 60}} />
          </View>
        </TouchableOpacity>
    </View>
    );
}

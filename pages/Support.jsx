
import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, Linking} from 'react-native';
import { styles, palette } from '../styles/styles';

export function Support( {navigation} ) {
  const onPressFQA = () => navigation.navigate("FQA")
  const onPressContact = () => navigation.navigate("Contact")

    return (
    <View style={[ styles.container, {flexDirection: 'column', padding: 0}]}>
        <TouchableOpacity  style={[styles.button, {backgroundColor: palette.red}]} onPress={onPressFQA}>
          <View style={styles.button_container}>
            <Text style={styles.button_text}>PREGUNTAS FRECUENTES</Text>
            <Image source={require('../assets/fyqIcon.png')} resizeMode='contain' style={{flex:1, marginBottom: 60}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.button, {backgroundColor: palette.red}]} onPress={onPressContact}>
          <View style={styles.button_container}>
            <Text style={styles.button_text}>CONTACTA CON NOSOTROS</Text>
            <Image source={require('../assets/phoneIcon.png')} resizeMode='contain' style={{flex:1, marginBottom: 60}} />
          </View>
        </TouchableOpacity>
    </View>
    );
}

import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {palette, styles} from '../../styles/styles';
import * as Speech from 'expo-speech';

/**
 * Método para reproducir el número
 * @param {string} text
 */
const speak = (num) => {
  Speech.speak(num);
};

/**
 * Método para renderizar página de dictar números.
 * @return {JSX.Element}
 */
export function DictaNumbers() {  

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TouchableOpacity style={talkerStyles.button} onPress={() => speak('1')}>
            <View style={styles.button_container}>
              <Text style={talkerStyles.button_text}> 1 </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={talkerStyles.button} onPress={() => speak('2')}>
            <View style={styles.button_container}>
              <Text style={talkerStyles.button_text}> 2 </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={talkerStyles.button} onPress={() => speak('3')}>
            <View style={styles.button_container}>
              <Text style={talkerStyles.button_text}> 3 </Text>
            </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TouchableOpacity style={talkerStyles.button} onPress={() => speak('4')}>
            <View style={styles.button_container}>
              <Text style={talkerStyles.button_text}> 4 </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={talkerStyles.button} onPress={() => speak('5')}>
            <View style={styles.button_container}>
              <Text style={talkerStyles.button_text}> 5 </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={talkerStyles.button} onPress={() => speak('6')}>
            <View style={styles.button_container}>
              <Text style={talkerStyles.button_text}> 6 </Text>
            </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TouchableOpacity style={talkerStyles.button} onPress={() => speak('7')}>
            <View style={styles.button_container}>
              <Text style={talkerStyles.button_text}> 7 </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={talkerStyles.button} onPress={() => speak('8')}>
            <View style={styles.button_container}>
              <Text style={talkerStyles.button_text}> 8 </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={talkerStyles.button} onPress={() => speak('9')}>
            <View style={styles.button_container}>
              <Text style={talkerStyles.button_text}> 9 </Text>
            </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TouchableOpacity style={[ {backgroundColor: '#fff'}]}>
            <View style={styles.button_container}>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={talkerStyles.button} onPress={() => speak('0')}>
            <View style={styles.button_container}>
              <Text style={talkerStyles.button_text}> 0 </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={[ {backgroundColor: '#fff'}]}>
            <View style={styles.button_container}>
            </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const talkerStyles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: palette.violet,
    margin: 5,
    borderRadius: 15,
    elevation: 3
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 60,
    textShadowColor: 'black',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
    borderRadius: 5,
  },
});

import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView, Pressable, TouchableOpacity} from 'react-native';
import {palette, styles} from '../../styles/styles';

/**
 * Método para renderizar página de menú de Dictado.
 * @return {JSX.Element}
 */
export function DictaMenu({navigation}) {  
  const onPressNumbers = () => navigation.navigate('DictaNumbers');
  const onPressText = () => navigation.navigate('DictaText');


  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={onPressNumbers}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}> NÚMEROS </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={onPressText}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}> PALABRAS </Text>
          </View>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const talkerStyles = StyleSheet.create({
  box: {
    alignItems: 'center',
    height: 100,
    backgroundColor: '#fff',
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 60,
    textShadowColor: 'black',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
    marginTop: 10,
  },
  button_text_small: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    marginTop: 10,
    paddingBottom: 20,
  },
});

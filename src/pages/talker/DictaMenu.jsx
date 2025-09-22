import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {palette, styles, dp} from '../../styles/styles';

/**
 * Método para renderizar página de menú de Dictado.
 * @return {JSX.Element}
 */
export function DictaMenu({navigation}) {
  const onPressNumbers = () => navigation.navigate('DictaNumbers');
  const onPressLetters = () => navigation.navigate('DictaLetters');
  const onPressText = () => navigation.navigate('DictaText');

  const dictaMenuButton = ({title, subtitle, onPress, side}) => (
    <TouchableOpacity
      style={[
        {
          backgroundColor: palette.violet,
          margin: dp(2),
          borderRadius: dp(6),
          flex: 1,
        },
      ]}
      onPress={onPress}>
      <View
        style={[
          styles.button_container,
          {
            alignItems: 'flex-start',
            padding: dp(25),
          },
        ]}>
        <Text style={talkerStyles.button_text}>{title.toUpperCase()}</Text>
        <Text style={talkerStyles.button_text_small}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      {dictaMenuButton({
        title: 'Números',
        subtitle: '0-1-2-3-4-5-6-7-8-9',
        onPress: onPressNumbers,
      })}
      {dictaMenuButton({
        title: 'Letras',
        subtitle: 'Deletrea una palabra',
        onPress: onPressLetters,
      })}
      {dictaMenuButton({
        title: 'Texto',
        subtitle: 'Lee un texto completo',
        onPress: onPressText,
      })}
    </SafeAreaView>
  );
}

const talkerStyles = StyleSheet.create({
  box: {
    alignItems: 'center',
    height: dp(100),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: -2, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: dp(30),
    marginTop: dp(10),
  },
  button_text_small: {
    color: '#fff',
    fontSize: dp(16),
    marginTop: dp(1),
    paddingBottom: dp(20),
  },
});

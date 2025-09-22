import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {styles, palette, dp} from '../styles/styles';
import Tts from 'react-native-tts';

/**
 * Método para renderizar lista de botones
 * @return {JSX.Element}
 */
export default function TOList({...props}) {
  /**
   * Método para activar la lectura de texto del TAP
   * @param {string} text
   */
  const speak = text => {
    Tts.speak(text);
  };

  const taplist = props.list.map((tap, index) => (
    <View key={index} style={{flex: 1}}>
      <TouchableOpacity
        key={index}
        style={[{backgroundColor: tap.color, flex: 1}]}
        onPress={() => speak(tap.text)}>
        <View style={styles.button_container}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit
            style={talkerStyles.button_text}>
            {tap.text}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          display: index != props.list.length - 1 ? 'flex' : 'none',
          height: dp(5),
        }}
      />
    </View>
  ));
  return <>{taplist}</>;
}

const talkerStyles = StyleSheet.create({
  box: {
    alignItems: 'center',
    height: 100,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: dp(40),
    textAlign: 'justify',
    color: palette.violet,
    lineHeight: 100,
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: dp(60),
    marginTop: 10,
    paddingBottom: 20,
    textAlign: 'center',
  },
});

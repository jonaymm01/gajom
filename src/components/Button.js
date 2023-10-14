// Button.js
import {StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';

import { dp } from '../styles/styles';

/**
 * Componente: Botón.
 * @param {*} {label, ...props}
 * @return {JSX.Element}
 */
export default function Button({label, ...props}) {
  if (props.img) {
    return (
      <TouchableOpacity activeOpacity={0.8} {...props} style={[styles.button, {backgroundColor: props.color, borderColor: props.color}]}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={props.img} resizeMode='contain' tintColor={'#fff'} style={{maxHeight: dp(30), maxWidth: dp(30), marginLeft: dp(20)}}/>
          <Text style={[styles.button_text, {flex: 2, textAlign: 'right', marginRight: 20}]}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity activeOpacity={0.8} {...props} style={[styles.button, {backgroundColor: props.color, borderColor: props.color}]}>
        <Text style={styles.button_text}>{label}</Text>
      </TouchableOpacity>
    );
  }

}

export const styles = StyleSheet.create({
  button: {
    height: dp(80),
    width: dp(300),
    alignItems: 'center',
    borderRadius: dp(20),
    marginTop: dp(10),
    elevation: 5
  },
  button_text: {
    color: '#fff',
    lineHeight: dp(80),
    fontSize: dp(23),
    fontWeight: '500',
  },
  purple: {
    backgroundColor: '#763CAD',
    borderColor: '#763CAD',
  },
  red: {
    backgroundColor: '#AC3C60',
    borderColor: '#AC3C60',
  },
  gray: {
    backgroundColor: '#b8b8b8',
    borderColor: '#b8b8b8',
  },
});

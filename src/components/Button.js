// Button.js
import {StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

/**
 * Componente: Botón.
 * @param {*} {label, ...props}
 * @return {JSX.Element}
 */
export default function Button({label, ...props}) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...props} style={[styles.button, {backgroundColor: props.color, borderColor: props.color}]}>
      <Text style={styles.button_text}>{label}</Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 300,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    elevation: 10,
  },
  button_text: {
    color: '#fff',
    lineHeight: 80,
    fontSize: 23,
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

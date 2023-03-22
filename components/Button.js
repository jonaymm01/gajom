// Button.js
import { StyleSheet } from 'react-native';

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ label, ...props }) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...props} style={styles.button}>
      <Text style={styles.button_text}>{label}</Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 300,
    alignItems: 'center',
    backgroundColor: '#763CAD',
    borderRadius: 40,
    borderColor: '#763CAD',
    marginTop: 10  
  },
  button_text: {
    color: '#fff',
    lineHeight: 80,
    fontSize: 23
  }
})

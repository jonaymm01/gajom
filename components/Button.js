// Button.js
import { StyleSheet } from 'react-native';

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ label, ...props }) {
  switch (props.color) {
    case 'purple':
      return (
          <TouchableOpacity activeOpacity={0.8} {...props} style={[styles.button, styles.purple,]}>
            <Text style={styles.button_text}>{label}</Text>
          </TouchableOpacity>
      );
      break;
    case 'red':
        return (
          <TouchableOpacity activeOpacity={0.8} {...props} style={[styles.button, styles.red]}>
            <Text style={styles.button_text}>{label}</Text>
          </TouchableOpacity>
        );
      break;
    case 'gray':
        return (
          <TouchableOpacity activeOpacity={0.8} {...props} style={[styles.button, styles.gray]}>
            <Text style={styles.button_text}>{label}</Text>
          </TouchableOpacity>
        );
        break;
  }
  
}

export const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 300,
    alignItems: 'center',
    borderRadius: 40,
    marginTop: 10,
    elevation: 10, 
  },
  button_text: {
    color: '#fff',
    lineHeight: 80,
    fontSize: 23
  },
  purple: {
    backgroundColor: '#763CAD',
    borderColor: '#763CAD'
  },
  red: {
    backgroundColor: '#AC3C60',
    borderColor: '#AC3C60'
  },
  gray: {
    backgroundColor: '#b8b8b8',
    borderColor: '#b8b8b8'
  }
})

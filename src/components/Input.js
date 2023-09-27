
import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {color, t} from 'react-native-tailwindcss';
import { palette } from '../styles/styles';

/**
 * Componente: Input de texto.
 * @param {*} props
 * @return {JSX.Element}
 */
export default function Input(props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, props.error && t.borderRed500, props.style, {color: palette.violet, borderColor: palette.violet}]}
        {...props}
      />
      {props.errorText && (
        <Text style={[styles.errorText]}>{props.errorText}</Text>
      )}
    </View>
  );
}

const styles = {
  wrapper: [t.selfStretch, t.mB5],
  input: [
    t.h11,
    t.border2,
    t.selfStretch,
    t.p6,
    t.borderPurple500,
    t.rounded,
    t.text2xl,
    t.textPurple700,
  ],
  errorText: [t.mT1, t.textRed500],
};

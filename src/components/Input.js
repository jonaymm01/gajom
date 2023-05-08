
import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {t} from 'react-native-tailwindcss';

/**
 * Componente: Input de texto.
 * @param {*} props
 * @return {JSX.Element}
 */
export default function Input(props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, props.error && t.borderRed500, props.style]}
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
    t.border,
    t.selfStretch,
    t.p6,
    t.borderGray500,
    t.rounded,
    t.textXl,
    t.textGray700,
  ],
  errorText: [t.mT1, t.textRed500],
};


import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { dp, palette } from '../styles/styles';

/**
 * Componente: Input de texto.
 * @param {*} props
 * @return {JSX.Element}
 */
export default function Input(props) {
  const [hiddenPin, setHiddenPin] = useState(true);

  const showPass = () => {
    setHiddenPin(!hiddenPin);
  };

  const eye =       
  <View style={{flex: 1}}>
  <TouchableOpacity onPress={() => {
    showPass();
  }}>
    <Image source={(hiddenPin) ? require('../../assets/eye_hidden_icon.png') : require('../../assets/eye_show_icon.png')} resizeMode='contain' style={{width: dp(40), height: dp(40)}} />
  </TouchableOpacity>
</View>

  return (
    <View style={{marginBottom: dp(30)}}>
    <View style={[inputStyles.wrapper, {borderColor: (props.borderColor) ? props.borderColor : palette.violet}]}>
      <TextInput
        secureTextEntry={ ((props.showHide) ? (hiddenPin ? true : false ) : (false))}
        style={inputStyles.text}
        {...props}
      />
      {(props.showHide) ? eye : null}
    </View>
    {props.errorText && (
      <Text style={[inputStyles.errorText]}>{props.errorText}</Text>
    )}
    </View>
  );
}

const inputStyles = StyleSheet.create({
  wrapper: {
    borderWidth: dp(3),
    borderRadius: dp(6),
    justifyContent: 'center',
    width: dp(300),
    minHeight: dp(80),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: dp(10)
  },
  text: {
    flex: 4,
    fontSize: dp(25),
    color: palette.violet,
    fontWeight: '500',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: dp(15),
  }
});
import React from 'react';
import {View, Text, Image} from 'react-native';
import {palette, dp} from '../styles/styles';

/**
 * Componente: Separador en forma de dos líneas horizontales con texto entre ellas
 * @param {*} {label, ...props}
 * @return {JSX.Element}
 */
export default function Separator({label, style, textStyle}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginTop: dp(10),
          marginBottom: dp(10),
          justifyContent: 'center',
        },
        style,
      ]}>
      <Text
        style={[
          {
            textAlign: 'center',
            fontSize: dp(25),
          },
          textStyle,
        ]}>
        {label}
      </Text>
    </View>
  );
}

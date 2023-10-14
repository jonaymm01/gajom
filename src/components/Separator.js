import React from 'react';
import {View, Text, Image} from 'react-native';
import {palette, dp} from '../styles/styles';

/**
 * Componente: Separador en forma de dos líneas horizontales con texto entre ellas
 * @param {*} {label, ...props}
 * @return {JSX.Element}
 */
export default function Separator({label, ...props}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: dp(30), marginBottom: dp(30), justifyContent: 'center'}}>
      <View>
        <Text style={{width: dp(200), textAlign: 'center', fontSize: dp(25), color: palette.violet}}>{props.children}</Text>
      </View>
    </View>
  );
}

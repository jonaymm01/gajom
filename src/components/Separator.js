import React from 'react';
import {View, Text, Image} from 'react-native';
import {palette} from '../styles/styles';

/**
 * Componente: Separador en forma de dos líneas horizontales con texto entre ellas
 * @param {*} {label, ...props}
 * @return {JSX.Element}
 */
export default function Separator({label, ...props}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: 30, marginBottom: 30}}>
      <View style={{flex: 1, height: 1, backgroundColor: palette.violet}} />
      <View>
        <Text style={{width: 200, textAlign: 'center', fontSize: 25, color: palette.violet}}>{props.children}</Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: palette.violet}} />
    </View>
  );
}

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
    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: dp(10), marginBottom: dp(10), justifyContent: 'center'}}>
      <View style={{marginTop: dp(40), marginBottom: dp(30), flexDirection: 'row', justifyContent: 'space-between', width: dp(50)}}>
        <View style={{backgroundColor: palette.violet, height: dp(7), width: dp(7), borderRadius: dp(2)}}/>
        <View style={{backgroundColor: palette.violet, height: dp(7), width: dp(7), borderRadius: dp(2)}}/>
        <View style={{backgroundColor: palette.violet, height: dp(7), width: dp(7), borderRadius: dp(2)}}/>
      </View>
      <Text style={{width: dp(200), textAlign: 'center', fontSize: dp(25), color: palette.violet, fontWeight: 'bold'}}>{props.children}</Text>
      <View style={{marginTop: dp(40), marginBottom: dp(30), flexDirection: 'row', justifyContent: 'space-between', width: dp(50)}}>
        <View style={{backgroundColor: palette.violet, height: dp(7), width: dp(7), borderRadius: dp(2)}}/>
        <View style={{backgroundColor: palette.violet, height: dp(7), width: dp(7), borderRadius: dp(2)}}/>
        <View style={{backgroundColor: palette.violet, height: dp(7), width: dp(7), borderRadius: dp(2)}}/>
      </View>
    </View>
  );
}

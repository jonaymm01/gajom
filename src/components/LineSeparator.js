import React from 'react';
import {View} from 'react-native';
import {palette} from '../styles/styles';

/**
 * Componente: Separadores en forma de línea horizontal
 * @param {*} param0
 * @return {JSX.Element}
 */
export default function LineSeparator({label, ...props}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: 50, marginBottom: 50, paddingLeft: 20, paddingRight: 20}}>
      <View style={{flex: 1, height: 2, backgroundColor: props.color}} />
    </View>
  );
}
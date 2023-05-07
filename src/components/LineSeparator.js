import React from 'react';
import {View} from 'react-native';
import {palette} from '../styles/styles';

/**
 * Componente: Separador en forma de línea horizontal
 * @param {*} param0
 * @return {JSX.Element}
 */
export default function LineSeparator({label, ...props}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: 50, marginBottom: 50}}>
      <View style={{flex: 1, height: 1, backgroundColor: palette.violet}} />
    </View>
  );
}

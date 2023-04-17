import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/styles';

export default function LineSeparator({ label, ...props }) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: 30, marginBottom: 30}}>
    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
  )
}
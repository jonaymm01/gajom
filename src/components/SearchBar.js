import { View, StyleSheet, ViewStyle, Platform, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { palette } from '../styles/styles';

export function SearchBar({...props}) {
  return (
    <View>
      <TextInput
        style={[searchStyles.input, { width: props.width }]}
        placeholder={props.placeholder}
        placeholderTextColor="#BBBBBB"
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
        onChangeText={props.textChanger}
        value={props.text}
      />
    </View>
  );
}

SearchBar.defaultProps = {
  placeholder: 'Buscar',
  width: 'auto',
  autoCapitalize: 'none',
  autoCorrect: false,
};

const searchStyles = StyleSheet.create({
    icon: {
        position: 'absolute',
        top: 10.5,
        left: 12,
        zIndex: 1,
      },
      input: {
        paddingVertical: Platform.OS === 'ios' ? 9 : 6,
        paddingLeft: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 50,
        fontSize: 20,
        borderWidth: 1,
        borderColor: palette.violet,
        shadowColor: '#fdfcfc',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
      }
});
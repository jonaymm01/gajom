import {View, StyleSheet, ViewStyle, Platform, TextInput} from 'react-native';
import React from 'react';
import {palette, dp} from '../styles/styles';

export function SearchBar({...props}) {
  return (
    <View>
      <TextInput
        style={[searchStyles.input, {width: props.width, textAlign: 'center'}]}
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
  input: {
    paddingVertical: Platform.OS === 'ios' ? 18 : 14,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: dp(20),
    borderWidth: 3,
    borderColor: palette.violet,
    shadowColor: '#fdfcfc',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    color: palette.violet,
    fontWeight: 'bold',
  },
});

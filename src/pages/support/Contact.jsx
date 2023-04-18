import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {styles, palette} from '../../styles/styles';

/**
 * Método para renderizar página de Contacto.
 * @return {JSX.Element}
 */
export function Contact() {
  return (
    <View style={[styles.container, {flexDirection: 'column', justifyContent: 'center'}]}>
      <View style={[stylesContact.box, {backgroundColor: palette.violet}]}>
        <Text style={[styles.title_white, {flex: 1, lineHeight: 100}]}>GAJOM</Text>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={stylesContact.text}>Teléfono → 638 00 00 00</Text>
          <Text style={stylesContact.text}>Email → gajom.app@email.com</Text>
        </View>
      </View>
      <View style={[stylesContact.box, {backgroundColor: palette.red}]}>
        <Text style={[styles.title_white, {flex: 1, lineHeight: 100}]}>LOGOPEDA</Text>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={stylesContact.text}>Teléfono → 648 00 00 00 00</Text>
          <Text style={stylesContact.text}>Email → logopeda@email.com</Text>
        </View>
      </View>
    </View>
  );
}

const stylesContact = StyleSheet.create({
  box: {
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 25,
    height: 180,
  },
  text: {
    fontSize: 20,
    textAlign: 'justify',
    color: '#fff',
  },
});

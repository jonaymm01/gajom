import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {palette} from '../../styles/styles';

/**
 * Método para renderizar página de Contacto.
 * @return {JSX.Element}
 */
export function Contact() {
  return (
    <View style={[styles.container, {flex:1, justifyContent: 'center'}]}>
      <View style={[styles.box]}>
        <Text style={[styles.title, {backgroundColor: palette.violet}]}>GAJOM</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, {fontWeight: 'bold', color: palette.violet}]}>Teléfono: </Text>
          <Text style={[styles.text, {color: palette.violet}]}>638 00 00 00</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, {fontWeight: 'bold', color: palette.violet}]}>Email: </Text>
          <Text style={[styles.text, {color: palette.violet}]}>gajom@email.com</Text>
        </View>
      </View>
      <View style={[styles.box]}>
        <Text style={[styles.title, {backgroundColor: palette.red}]}>LOGOPEDA</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, {fontWeight: 'bold', color: palette.red}]}>Teléfono: </Text>
          <Text style={[styles.text, {color: palette.red}]}>698 00 00 00</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, {fontWeight: 'bold', color: palette.red}]}>Email: </Text>
          <Text style={[styles.text, {color: palette.red}]}>logopeda@email.com</Text>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  box: {
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    padding: 20,
    borderColor: '#000',
    borderWidth: 2,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -40,
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    color: '#fff',
    alignSelf: 'flex-start',

  },
  text: {
    fontSize: 18,
    textAlign: 'left',
  }
});


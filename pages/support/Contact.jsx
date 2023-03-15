import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, Linking, ScrollView} from 'react-native';
import { styles } from '../../styles/styles';


export function Contact() {
    return (
      <View style={[styles.container, {flexDirection: 'column', justifyContent: 'center'}]}>
          <View style={[styles_contact.box, {backgroundColor: '#763CAD'}]}>
              <Text style={[styles.title_white, {flex:1, lineHeight: 100}]}>GAJOM</Text>
              <View style={{flex:1, alignItems: 'center'}}>
                <Text style={styles_contact.text}>Teléfono → 638 00 00 00</Text>
                <Text style={styles_contact.text}>Email → gajom.app@email.com</Text>
              </View>
          </View>
          <View style={[styles_contact.box, {backgroundColor: '#AD3C61'}]}>
            <Text style={[styles.title_white, {flex:1, lineHeight: 100}]}>LOGOPEDA</Text>
            <View style={{flex:1, alignItems: 'center'}}>
              <Text style={styles_contact.text}>Teléfono → 648 00 00 00 00</Text>
              <Text style={styles_contact.text}>Email → logopeda@email.com</Text>
            </View>
          </View>
      </View>
    );
}

const styles_contact = StyleSheet.create({
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
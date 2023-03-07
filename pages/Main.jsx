import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity } from 'react-native';
import { GamesStackNavigator, MainStackNavigator, TalkerStackNavigator } from "../components/StackNavigator";


export function Main({ navigation }) {
  const onPressSupport = () => navigation.navigate("Soporte")
  const onPressUser = () => navigation.navigate("Mi perfil")
  const onPressLogopedazo = () => alert('Esto es un Logopedazo');

    return (
    <View style={[ styles.container, {flexDirection: 'column', padding: 0}]}>
    <View style={[ styles.container, {flexDirection: 'row', padding: 0}]}>
      <TouchableOpacity  style={[styles.button, {backgroundColor: '#AC3C60', borderEndWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressSupport}>
      <View style={styles.button_container}>
        <Image source={require('../assets/favicon.png')} resizeMode='contain' style={{flex:.2 }} />
        <Text style={styles.button_text}>Necesito ayuda</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity  style={[styles.button, {backgroundColor: '#AC3C60', borderLeftWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressUser} />
    </View>
    <TouchableOpacity  style={[styles.button, {backgroundColor: '#AC3C60', borderTopWidth: 2.5}]} onPress={onPressLogopedazo}/>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
    },
    button: {
      flex: 1, 
      borderWidth: 5,
      borderColor: 'white'

    },
    logopedazo_container: {
      flex: 1, 
      backgroundColor: '#000',
      fontSize: 16,
      width: 30
    },
    logopedazo_texto: {
      flex: 1, 
      color: '#fff',
      fontSize: 40,
    },
    button_container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    button_small: {
      height: 80,
      width: 300,
      alignItems: 'center',
      backgroundColor: '#763CAD',
      borderRadius: 40,
      borderColor: '#763CAD',
      marginTop: 10
    },
    button_text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 80
    },
});
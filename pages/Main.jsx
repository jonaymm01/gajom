import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, Linking} from 'react-native';
import { GamesStackNavigator, MainStackNavigator, TalkerStackNavigator } from "../components/StackNavigator";


export function Main({ navigation }) {
  const onPressSupport = () => navigation.navigate("Soporte")
  const onPressUser = () => navigation.navigate("Mi perfil")
  const logopedazo_content = "La afonía es perder por completo la voz. La disfonía, pérdida parcial. ¿Voz de camionero post-fiesta? No estás afónico... ¡estás disfónico!"
  const logopedazo_url = 'https://es.wikipedia.org/wiki/Disfon%C3%ADa';
  const onPressLogopedazo = () => Linking.openURL(logopedazo_url);

    return (
    <View style={[ styles.container, {flexDirection: 'column', padding: 0}]}>
      <View style={[ styles.container, {flexDirection: 'row', padding: 0}]}>
        <TouchableOpacity  style={[styles.button, {backgroundColor: '#AC3C60', borderEndWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressSupport}>
          <View style={styles.button_container}>
            <Text style={styles.button_text}>Centro de Ayuda</Text>
            <Image source={require('../assets/SupportImage.png')} resizeMode='contain' style={{flex:1, marginBottom: 60}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.button, {backgroundColor: '#AC3C60', borderLeftWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressUser}>
          <View style={styles.button_container}>
            <Text style={styles.button_text}>Editar perfil</Text>
            <Image source={require('../assets/UserImage.png')} resizeMode='contain' style={{flex:1, marginBottom: 60}} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity  style={[styles.button, {backgroundColor: '#AC3C60', borderTopWidth: 2.5}]} onPress={onPressLogopedazo}>
      <View style={styles.button_container}>
        <Image source={require('../assets/logo/logo_gajom.png')} resizeMode='contain' style={{flex:1, marginTop: -70, borderColor: 'blue'}} />
        <Text style={styles.logopedazo_title}>LOGOPEDAZO DEL DÍA</Text>
        <Text style={styles.logopedazo_text}>{logopedazo_content}</Text>
      </View>
      </TouchableOpacity>
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
    logopedazo_title: {
      flex: 1, 
      color: '#fff',
      fontSize: 30,
      justifyContent: 'center',
      fontWeight: 'bold',
      fontStyle: 'italic',
      lineHeight: 80
    },
    logopedazo_text: {
      flex: 1, 
      color: '#fff',
      fontSize: 20,
      justifyContent: 'center',
      marginTop: -60
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
      flex: 1,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 120,
    },
});
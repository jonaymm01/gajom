import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, Linking} from 'react-native';
import { GamesStackNavigator, MainStackNavigator, TalkerStackNavigator } from "../components/StackNavigator";
import { styles } from "../styles/styles"

export function Main({ navigation }) {
  const onPressSupport = () => navigation.navigate("Soporte")
  const onPressUser = () => navigation.navigate("Mi perfil")
  const logopedazo_content = `La afonia es perder por completo la voz. La disfonía, pérdida parcial. ¿Voz de camionero post-fiesta? No estás afónico... ¡estás disfónico!`
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

import React from 'react';
import {Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import {styles, palette} from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Método para renderizar la página de Inicio.
 * @param {*} navigation
 * @return {JSX.Element}
 */
export function Main({navigation}) {
  const onPressSupport = () => navigation.navigate('Soporte');
  const onPressUser = async () => {
    try {
      const user = await AsyncStorage.getItem('active');
      if (user == '{}') {
        {navigation.navigate('Login');};
      } else {
        navigation.navigate('User');
      };
    } catch (error) {
      console.log(error);
    }
  };

  const logopedazoContent = `La afonia es perder por completo la voz. La disfonía, pérdida parcial. ¿Voz de camionero post-fiesta? No estás afónico... ¡estás disfónico!`;
  const logopedazoUrl = 'https://es.wikipedia.org/wiki/Disfon%C3%ADa';
  const onPressLogopedazo = () => Linking.openURL(logopedazoUrl);

  return (
    <View style={[styles.container, {flexDirection: 'column', padding: 0}]}>
      <View style={[styles.container, {flexDirection: 'row', padding: 0}]}>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.red, borderEndWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressSupport}>
          <View style={styles.button_container}>
            <Text style={styles.button_text}>Centro de Ayuda</Text>
            <Image source={require('../../assets/SupportImage.png')} resizeMode='contain' style={{flex: 1, marginBottom: 60}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.red, borderLeftWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressUser}>
          <View style={styles.button_container}>
            <Text style={styles.button_text}>Perfil</Text>
            <Image source={require('../../assets/UserImage.png')} resizeMode='contain' style={{flex: 1, marginBottom: 60, width: 100}} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.button, {backgroundColor: palette.red, borderTopWidth: 2.5}]} onPress={onPressLogopedazo}>
        <View style={styles.button_container}>
          <Image source={require('../../assets/logo/logo_gajom.png')} resizeMode='contain' style={{flex: 1, marginTop: -70, borderColor: 'blue'}} />
          <Text style={styles.logopedazo_title}>LOGOPEDAZO DEL DÍA</Text>
          <Text style={styles.logopedazo_text}>{logopedazoContent}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

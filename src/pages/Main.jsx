import React from 'react';
import {Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import {styles, palette} from '../styles/styles';

/**
 * Método para renderizar la página de Inicio.
 * @param {*} navigation
 * @return {JSX.Element}
 */
export function Main({navigation}) {
  const onPressContact = () => navigation.navigate('Contact');
  const onPressFQA = () => navigation.navigate('FQA');

  const logopedazoContent = `La afonia es perder por completo la voz. La disfonía, pérdida parcial. ¿Voz de camionero post-fiesta? No estás afónico... ¡estás disfónico!`;
  const logopedazoUrl = 'https://es.wikipedia.org/wiki/Disfon%C3%ADa';
  const onPressLogopedazo = () => Linking.openURL(logopedazoUrl);

  return (
    <View style={[styles.container, {flexDirection: 'column', padding: 0}]}>
      <View style={[styles.container, {flexDirection: 'row', padding: 0}]}>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.red, borderEndWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressContact}>
          <View style={styles.button_container}>
            <Text style={styles.button_text}>Contacto</Text>
            <Image source={require('../../assets/contact_icon.png')} resizeMode='contain' style={{flex: 1, marginBottom: 80, width: 100}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.red, borderLeftWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressFQA}>
          <View style={styles.button_container}>
            <Text style={styles.button_text}>Dudas</Text>
            <Image source={require('../../assets/fqa_icon.png')} resizeMode='contain' style={{flex: 1, marginBottom: 80, width: 100}} />
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

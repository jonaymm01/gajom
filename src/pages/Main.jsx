import React from 'react';
import {Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import {styles, palette} from '../styles/styles';

import {Logopedazos} from '../content/Logopedazos';

/**
 * Método para renderizar la página de Inicio.
 * @param {*} navigation
 * @return {JSX.Element}
 */
export function Main({navigation}) {
  const now = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const day = days[now.getDay()];

  const fullDate = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const newdate = day + '/' + month + '/' + year;
    return newdate;
  };

  const todayLogo = () => {
    let actualText = '';
    let actualLink = '';

    switch (day) {
      case 'sunday':
        actualText = Logopedazos.sunday.text;
        actualLink = Logopedazos.sunday.link;
        break;
      case 'monday':
        actualText = Logopedazos.monday.text;
        actualLink = Logopedazos.monday.link;
        break;
      case 'tuesday':
        actualText = Logopedazos.tuesday.text;
        actualLink = Logopedazos.tuesday.link;
        break;
      case 'wednesday':
        actualText = Logopedazos.wednesday.text;
        actualLink = Logopedazos.wednesday.link;
        break;
      case 'thursday':
        actualText = Logopedazos.thursday.text;
        actualLink = Logopedazos.thursday.link;
        break;
      case 'friday':
        actualText = Logopedazos.friday.text;
        actualLink = Logopedazos.friday.link;
        break;
      case 'saturday':
        actualText = Logopedazos.saturday.text;
        actualLink = Logopedazos.saturday.link;
        break;
    }
    const logopedazo = {
      text: actualText,
      link: actualLink,
    };
    return logopedazo;
  };

  const dayToSpanish = (day) => {
    switch (day) {
      case 'monday': return 'lunes';
      case 'tuesday': return 'martes';
      case 'wednesday': return 'miércoles';
      case 'thursday': return 'jueves';
      case 'friday': return 'viernes';
      case 'saturday': return 'sábado';
      case 'sunday': return 'domingo';
    }
  };

  const dia = dayToSpanish(day);

  const onPressContact = () => navigation.navigate('Contact');
  const onPressFQA = () => navigation.navigate('FQA');

  const logopedazoContent = todayLogo().text;
  const logopedazoUrl = todayLogo().link;
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
          <Text style={{alignSelf: 'flex-start', marginTop: -40, marginLeft: 30, color: '#fff', fontWeight: 'bold', fontSize: 20}}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</Text>
          <Text style={{alignSelf: 'flex-end', marginTop: -25, marginRight: 30, color: '#fff', fontWeight: 'bold', fontSize: 18}}>{fullDate()}</Text>
          <Text style={[styles.logopedazo_title, {marginTop: 20}]}>LOGOPEDAZO DEL DÍA</Text>
          <Text style= {styles.logopedazo_text}>{logopedazoContent}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

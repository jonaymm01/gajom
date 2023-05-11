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
  const dayToSpanish = (day) => {
    switch (day) {
      case 1: return 'domingo';
      case 2: return 'lunes';
      case 3: return 'martes';
      case 4: return 'miércoles';
      case 5: return 'jueves';
      case 6: return 'viernes';
      case 7: return 'sábado';
    }
  };

  const monthToSpanish = (month) => {
    switch (month) {
      case 1: return 'enero';
      case 2: return 'febrero';
      case 3: return 'marzo';
      case 4: return 'abril';
      case 5: return 'mayo';
      case 6: return 'junio';
      case 7: return 'julio';
      case 8: return 'agosto';
      case 9: return 'septiembre';
      case 10: return 'octubre';
      case 11: return 'noviembre';
      case 12: return 'diciembre';
    }
  };

  const fullDate = () => {
    const dateObj = new Date();
    const monthNumber = dateObj.getUTCMonth() + 1; // months from 1-12
    const dayNumber = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const dia = dayToSpanish(dateObj.getDay()+1);
    const mes = monthToSpanish(monthNumber);
    const upperCaseDia = dia.charAt(0).toUpperCase() + dia.slice(1);

    const newdate = upperCaseDia + ' ' + dayNumber + ' de ' + mes + ' de ' + year;
    return newdate;
  };

  const todayLogo = () => {
    let actualText = '';
    let actualLink = '';
    const now = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const day = days[now.getDay()];

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

  const onPressContact = () => navigation.navigate('Contact');
  const onPressFQA = () => navigation.navigate('FQA');

  const logopedazoContent = todayLogo().text;
  const logopedazoUrl = todayLogo().link;
  const onPressLogopedazo = () => Linking.openURL(logopedazoUrl);

  return (
    <View style={[styles.container, {flexDirection: 'column', padding: 0}]}>
      <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
      </View>
      <View style={[styles.container, {flexDirection: 'row', padding: 0}]}>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet, borderEndWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressContact}>
          <View style={styles.button_container}>
            <Text style={[styles.button_text]}>Contacto</Text>
            <Image source={require('../../assets/contact_icon.png')} resizeMode='contain' style={{maxWidth: 90, maxHeight: 90, margin: 10}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet, borderLeftWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressFQA}>
          <View style={styles.button_container}>
            <Text style={[styles.button_text]}>Dudas</Text>
            <Image source={require('../../assets/fqa_icon.png')} resizeMode='contain' style={{maxWidth: 90, maxHeight: 90, margin: 10}} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet, borderTopWidth: 2.5}]} onPress={onPressLogopedazo}>
        <View style={styles.button_container}>
          <View style={{flex: 1, marginTop: 30}}>
            <Text style={[styles.logopedazo_title]}>LOGOPEDAZO DEL DÍA</Text>
            <Text style={{textAlign: 'left', color: '#fff', fontWeight: 'bold', fontSize: 20}}>{fullDate()}</Text>
          </View>
          <Text style= {styles.logopedazo_text}>{logopedazoContent}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {styles, palette} from '../styles/styles';

/**
 * Método para renderizar la página de Inicio.
 * @param {*} navigation
 * @return {JSX.Element}
 */
export function Info({navigation}) {

  const onPressProfile = () => navigation.navigate('FQA', {itemId: 'fqa_profile', quest: 'profile'});
  const onPressTalker = () => navigation.navigate('FQA', {itemId: 'fqa_talker', quest: 'talker'});
  const onPressFQA = () => navigation.navigate('FQA', {itemId: 'fqa_fqa', quest: 'fqa'});



  return (
    <View style={[infoStyles.container, {flexDirection: 'column', padding: 0}]}>
      <View style= {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[infoStyles.title]}>¿Alguna pregunta?</Text>
      </View>
      <View style= {{flex: 7}}>
      <View style={[infoStyles.container, {flexDirection: 'row', padding: 0}]}>
        <TouchableOpacity style={[infoStyles.button, {backgroundColor: palette.violet, borderEndWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressProfile}>
          <View style={infoStyles.button_container}>
            <Text style={[infoStyles.button_text]}>PERFILES</Text>
            <View style={{backgroundColor: '#fff', borderRadius: 60, padding: 10}}>
              <Image source={require('../../assets/profileIcon.png')} resizeMode='contain' style={{maxWidth: 60, maxHeight: 60, margin: 10}} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[infoStyles.button, {backgroundColor: palette.violet, borderLeftWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressTalker}>
          <View style={infoStyles.button_container}>
            <Text style={[infoStyles.button_text]}>GAJOM</Text>
            <View style={{backgroundColor: '#fff', borderRadius: 60, padding: 10}}>
              <Image source={require('../../assets/chatIcon.png')} resizeMode='contain' style={{maxWidth: 60, maxHeight: 60, margin: 10}} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[infoStyles.button, {backgroundColor: palette.violet, borderLeftWidth: 2.5, borderBottomWidth: 2.5}]} onPress={onPressFQA}>
          <View style={infoStyles.button_container}>
            <Text style={[infoStyles.button_text, {fontSize: 30}]}>DUDAS Y CONSEJOS</Text>
            <View style={{backgroundColor: '#fff', borderRadius: 60}}>
              <Image source={require('../../assets/fqa_icon.png')} resizeMode='contain' style={{maxWidth: 90, maxHeight: 90, margin: 10}} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}


export const infoStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    borderWidth: 5,
    borderColor: 'white',
    margin: 8,
    borderRadius: 20,
  },
  button_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    color: palette.violet,
    fontWeight: 'bold',
    fontSize: 30,
  },
});

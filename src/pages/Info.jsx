import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {styles, palette, dp} from '../styles/styles';

/**
 * Método para renderizar la página de Inicio.
 * @param {*} navigation
 * @return {JSX.Element}
 */
export function Info({navigation}) {
  const onPressProfile = () =>
    navigation.navigate('FQA', {itemId: 'fqa_profile', quest: 'profile'});
  const onPressTalker = () =>
    navigation.navigate('FQA', {itemId: 'fqa_talker', quest: 'talker'});
  const onPressFQA = () =>
    navigation.navigate('FQA', {itemId: 'fqa_fqa', quest: 'fqa'});

  return (
    <View style={[infoStyles.container, {flexDirection: 'column', padding: 0}]}>
      <View style={{flex: 7}}>
        <View
          style={[infoStyles.container, {flexDirection: 'row', padding: 0}]}>
          <TouchableOpacity
            style={[
              infoStyles.button,
              {
                backgroundColor: palette.violet,
                borderEndWidth: dp(1.5),
                borderBottomWidth: dp(1.5),
              },
            ]}
            onPress={onPressProfile}>
            <View style={infoStyles.button_container}>
              <Text style={[infoStyles.button_text]}>PERFILES</Text>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: dp(60),
                  padding: dp(10),
                }}>
                <Image
                  source={require('../../assets/profileIcon.png')}
                  resizeMode="contain"
                  style={{maxWidth: dp(60), maxHeight: dp(60), margin: dp(10)}}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              infoStyles.button,
              {
                backgroundColor: palette.violet,
                borderLeftWidth: dp(1.5),
                borderBottomWidth: dp(1.5),
              },
            ]}
            onPress={onPressTalker}>
            <View style={infoStyles.button_container}>
              <Text style={[infoStyles.button_text]}>GAJOM</Text>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: dp(60),
                  padding: dp(10),
                }}>
                <Image
                  source={require('../../assets/chatIcon.png')}
                  resizeMode="contain"
                  style={{maxWidth: dp(60), maxHeight: dp(60), margin: dp(10)}}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            infoStyles.button,
            {
              backgroundColor: palette.violet,
              borderLeftWidth: dp(1.5),
              borderBottomWidth: dp(1.5),
            },
          ]}
          onPress={onPressFQA}>
          <View style={infoStyles.button_container}>
            <Text style={[infoStyles.button_text, {fontSize: dp(30)}]}>
              DUDAS Y CONSEJOS
            </Text>
            <View style={{backgroundColor: '#fff', borderRadius: dp(60)}}>
              <Image
                source={require('../../assets/fqa_icon.png')}
                resizeMode="contain"
                style={{maxWidth: dp(90), maxHeight: dp(90), margin: dp(10)}}
              />
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
    padding: dp(5),
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    borderColor: 'white',
    margin: dp(2),
    borderRadius: dp(5),
  },
  button_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: dp(20),
    textAlign: 'center',
    marginBottom: dp(20),
  },
  title: {
    color: palette.violet,
    fontWeight: 'bold',
    fontSize: dp(30),
  },
});

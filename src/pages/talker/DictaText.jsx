import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView, Pressable, TouchableOpacity, Image} from 'react-native';
import {palette, styles} from '../../styles/styles';
import {useForm, Controller} from 'react-hook-form';
import * as Speech from 'expo-speech';

import Input from '../../components/Input';

/**
 * Método para reproducir el texto
 * @param {string} text
 */
const speak = (txt) => {
  Speech.speak(txt);
};

/**
 * Método para renderizar página de dictar texto.
 * @return {JSX.Element}
 */
export function DictaText() {  

  const [text, setText] = useState('');
  const {handleSubmit, control, formState: {errors}, getValues, resetField} = useForm();


  return (
    <SafeAreaView style= {{flex: 1, backgroundColor: '#fff'}}>
      <View style={{alignItems: 'center', backgroundColor: '#fff', flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
          <Pressable
            style={[creatorStyles.button, {backgroundColor: palette.gray}]}
            onPress={() => {
              resetField('txt');
              setText('');
            }}
          >
            <Image source={require('../../../assets/trash_icon.png')} tintColor={'#fff'} resizeMode='contain' style={{maxWidth: 40, maxHeight: 40, margin: 10, alignSelf: 'center'}} />
          </Pressable>
          <Controller
          name="txt"
          defaultValue=""
          control={control}
          rules={{
            required: {value: true, message: 'Escribe las palabras a reproducir'},
          }}
          render={({field: {onChange, value}}) => (
          <View style={{maxWidth: 250, minWidth: 100}}>
            <Input
              minWidth={250}
              error={errors.name}
              errorText={errors?.name?.message}
              onChangeText={(text) => {
                setText(text);
                onChange(text);
              }}
              value={value}
              placeholder={'Escribe aquí'}
              autoCapitalize="none"
            />
          </View>
          )}
        />
        </View>
        <Text style={[styles.title, {marginBottom: 20, color: palette.violet}]}>¡Pulsa para dictarlo!</Text>
        <View style={{minWidth: 200, minHeight: 200}}>
        <TouchableOpacity style={{backgroundColor: palette.violet, elevation: 10, borderRadius: 20, flex: 1}} onPress={() => speak(text)}>
            <View style={{}}>
              <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: '#fff', padding: 10, margin: 10, flexWrap: 'wrap'}]}>{(text == '') ? '...' : text}</Text>
            </View>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const creatorStyles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: 60,
    height: 60,
    elevation: 10,
    marginRight: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 80,
    fontSize: 25,
  },
});

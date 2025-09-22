import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {palette, styles, dp} from '../../styles/styles';
import {useForm, Controller} from 'react-hook-form';
import Tts from 'react-native-tts';

import Button from '../../components/Button';
import Input from '../../components/Input';

/**
 * Método para reproducir el texto
 * @param {string} text
 */
const speak = txt => {
  Tts.speak(txt);
};

/**
 * Método para renderizar página de dictar texto.
 * @return {JSX.Element}
 */
export function DictaText() {
  const [text, setText] = useState('');
  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
    resetField,
  } = useForm();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#fff',
              flex: 1,
              marginBottom: dp(10),
              alignContent: 'center',
            }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
              keyboardVerticalOffset={Platform.select({
                ios: () => dp(100),
                android: () => dp(100),
              })()}
              style={{alignItems: 'center', marginTop: dp(20)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: dp(5),
                  marginBottom: dp(20),
                }}>
                <Button
                  color={palette.violet}
                  onPress={() => speak(text)}
                  label="Leer texto"
                />
              </View>
              <Controller
                name="txt"
                defaultValue=""
                control={control}
                rules={{
                  required: {value: true, message: 'Escribe algunas palabras'},
                }}
                render={({field: {onChange, value}}) => (
                  <Input
                    maxLength={150}
                    multiline
                    textAlign={'left'}
                    error={errors.name}
                    errorText={errors?.name?.message}
                    onChangeText={text => {
                      onChange(text);
                      setText(text);
                    }}
                    value={value}
                    placeholder={'...'}
                    autoCapitalize="sentences"
                    marginLeft={dp(10)}
                    fontSize={dp(22)}
                  />
                )}
              />
            </KeyboardAvoidingView>
            <View style={{marginTop: -dp(15)}}>
              <Button
                img={require('../../../assets/trash_icon.png')}
                color={palette.gray}
                onPress={() => {
                  resetField('txt');
                  setText('');
                }}
                label={text.length + '/150'}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const creatorStyles = StyleSheet.create({
  button: {
    borderRadius: dp(10),
    width: dp(60),
    height: dp(60),
    marginRight: dp(15),
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: dp(80),
    fontSize: dp(25),
  },
});

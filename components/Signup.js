import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUser, setUser, setActiveUser } from '../_helpers/storage';

import { t, color } from 'react-native-tailwindcss';
import Input from '../components/Input';
import Button from '../components/Button';

import { useForm, Controller } from 'react-hook-form';

export function SignUp({navigation}) {
  const onPressLogin = () => navigation.navigate("Login")

  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = async (value) => {
    await setUser(value);
  };

  return (
    <View style={{flex:1}}>

    <View style={[ styles.container, {flexDirection: 'row'}]}>
    <TouchableOpacity  style={[styles.button, {backgroundColor: '#AC3C60'}]} onPress={onPressLogin}>
      <View style={styles.button_container}>
        <Text style={styles.button_text}>INICIAR SESIÓN</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity  style={[styles.button, {backgroundColor: 'lightgrey'}]} disabled={true}>
      <View style={styles.button_container}>
        <Text style={styles.button_text}>REGISTRARSE</Text>
      </View>
    </TouchableOpacity>
    </View>

    <View style={form_styles.input_container}>
      <Text style={[styles.title, {lineHeight: 80, marginTop: -50}]}>Crea tu cuenta</Text>
      <Controller
        name="name"
        defaultValue=""
        control={control}
        rules={{
          required: { value: true, message: 'Escribe tu nombre' }
        }}      
        render={({ field: { onChange, value } }) => (
            <Input
              error={errors.name}
              errorText={errors?.name?.message}
              onChangeText={(text) => onChange(text)}
              value={value}
              placeholder="Nombre"
            />
        )}
      />
      <Controller
        name="email"
        defaultValue=""
        control={control}
        rules={{
          required: { value: true, message: 'Escribe tu correo electrónico' },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        }}
        render={({ field: { onChange, value } }) => (
            <Input
              error={errors.email}
              errorText={errors?.email?.message}
              onChangeText={(text) => onChange(text)}
              value={value}
              placeholder="Correo electrónico"
            />
        )}
      />
       <Controller
        name="password"
        defaultValue=""
        control={control}
        rules={{
            required: { value: true, message: 'Escribe una contraseña' }
          }}   
        render={({ field: { onChange, value } }) => (
            <Input
              error={errors.password}
              errorText={errors?.password?.message}
              onChangeText={(text) => onChange(text)}
              value={value}
              placeholder="Contraseña"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              secureTextEntry
              enablesReturnKeyAutomatically
            />
        )}
      />
      <Button onPress={handleSubmit(onSubmit)} label="Registrarse" />
    </View>
    </View>
  );
}
export const form_styles = StyleSheet.create({
  input_container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
    padding: 20
  },
})
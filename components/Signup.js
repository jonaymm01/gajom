import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable } from 'react-native';
import { styles } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUser, setUser, setActiveUser } from '../_helpers/storage';

import Input from '../components/Input';
import Button from '../components/Button';

import { useForm, Controller } from 'react-hook-form';

export function SignUp({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const onPressLogin = () => navigation.navigate("Login")

  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = async (value) => {
    const user = await AsyncStorage.getItem(value.email)
    if (user)
     setModalVisible(true)
    else await setUser(value);
  };

  return (
    <ScrollView style= {{backgroundColor: '#fff'}}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={modal_styles.centeredView}>
          <View style={modal_styles.modalView}>
            <Text style={modal_styles.modalText}>Ya existe una cuenta asociada a ese correo electrónico.</Text>
            <Pressable
              style={[modal_styles.button, modal_styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={modal_styles.textStyle}>Ok!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
      <Text style={[styles.title, {lineHeight: 80, marginTop: -20}]}>Crea tu cuenta</Text>
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
              autoCapitalize="none"
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
    </ScrollView>
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

const modal_styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    width: 200,
    height: 80,
    elevation: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 80,
    fontSize: 50
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20
  },
});

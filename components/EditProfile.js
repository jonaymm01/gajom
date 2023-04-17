import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable, Image } from 'react-native';
import { styles } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUser, setUser, setActiveUser } from '../_helpers/storage';

import Input from '../components/Input';
import Button from '../components/Button';

import { useForm, Controller } from 'react-hook-form';

export function EditProfile(props) {
  const [modalVisible, setModalVisible] = useState(false);

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
            <Image source={require('../assets/warning.png')} resizeMode='contain' style={{width: 80, height: 80}} />
            <Text style={modal_styles.modalText}>Ya existe una cuenta asociada a ese correo electrónico.</Text>
            <Pressable
              style={[modal_styles.button, modal_styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={modal_styles.textStyle}>¡Entendido!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    <View style={form_styles.input_container}>
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
              placeholder={props.name}
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
              placeholder={props.email}
              autoCapitalize="none"
            />
        )}
      />
      <Button onPress={handleSubmit(onSubmit)} label="Guardar cambios" />
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
    borderColor: '#ed1c24',
    borderWidth: 10,
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
    elevation: 10,
  },
  button: {
    borderRadius: 10,
    width: 200,
    height: 80,
    elevation: 10,
  },
  buttonOpen: {
    backgroundColor: '#763CAD',
  },
  buttonClose: {
    backgroundColor: '#ed1c24',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 80,
    fontSize: 30,
  },
  modalText: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold'
  },
});

import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setActive} from '../_helpers/storage';
import Input from '../components/Input';
import Button from '../components/Button';

import {styles, palette} from '../styles/styles';

/**
 * Componente: Inicio de sesión
 * @param {*} navigation
 * @return {JSX.Element}
 */
export function Login({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  const onPressSignup = () => navigation.navigate('Signup');

  const {handleSubmit, control, formState: {errors}} = useForm();

  const onSubmit = async (value) => {
    await setActive(value).then((pass) => {
      if (pass) {
        console.log(value.email, 'ha iniciado sesión');
        navigation.navigate('User');
      } else {
        setModalVisible(true);
      }
    });
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    console.log(result);
  };

  return (
    <ScrollView style= {{backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Image source={require('../../assets/warning.png')} resizeMode='contain' style={{width: 80, height: 80}} />
              <Text style={modalStyles.modalText}>Usuario o contraseña incorrectos</Text>
              <Pressable
                style={[modalStyles.button, modalStyles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={modalStyles.textStyle}>¡Entendido!</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={[styles.container, {flexDirection: 'row'}]}>
          <TouchableOpacity style={[styles.button, {backgroundColor: 'lightgrey'}]} disabled={true}>
            <View style={styles.button_container}>
              <Text style={styles.button_text}>INICIAR SESIÓN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: palette.red}]} onPress={onPressSignup}>
            <View style={styles.button_container}>
              <Text style={styles.button_text}>REGISTRARSE</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[formStyles.input_container]}>
          <Text style={[styles.title, {lineHeight: 80, marginTop: -20}]}>Inicio de sesión</Text>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{
              required: {value: true, message: 'Escribe tu correo electrónico'},
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            }}
            render={({field: {onChange, value}}) => (
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
              required: {value: true, message: 'Escribe una contraseña'},
            }}
            render={({field: {onChange, value}}) => (
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
          <Button color="purple" onPress={handleSubmit(onSubmit)} label="Iniciar sesión" />
        </View>
      </View>
    </ScrollView>
  );
}


export const formStyles = StyleSheet.create({
  input_container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
});

const modalStyles = StyleSheet.create({
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
    fontWeight: 'bold',
  },
});
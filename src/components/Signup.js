import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';

import {setUser} from '../_helpers/storage';
import Input from '../components/Input';
import Button from '../components/Button';

import {styles, palette} from '../styles/styles';

/**
 * Componente: Registro
 * @param {*} navigation
 * @return {JSX.Element}
 */
export function SignUp({navigation}) {
  const [modalWarning, setModalWarning] = useState(false);
  const [modalSigned, setModalSigned] = useState(false);
  const onPressLogin = () => navigation.navigate('Login');

  const {handleSubmit, control, formState: {errors}} = useForm();

  const onSubmit = async (value) => {
    const user = await AsyncStorage.getItem(value.email);
    if (user) {
      setModalWarning(true);
    } else {
      await setUser(value);
      setModalSigned(true);
    };
  };

  return (
    <ScrollView style= {{backgroundColor: '#fff'}}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalWarning}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalWarning(!modalWarning);
        }}>
        <View style={modalStyles.centeredView}>
          <View style={[modalStyles.modalView, modalStyles.borderWarning]}>
            <Image source={require('../../assets/warning.png')} resizeMode='contain' style={{width: 80, height: 80}} />
            <Text style={modalStyles.modalText}>Ya existe una cuenta asociada a ese correo electrónico.</Text>
            <Pressable
              style={[modalStyles.button, modalStyles.redBackground]}
              onPress={() => setModalWarning(!modalWarning)}>
              <Text style={modalStyles.textStyle}>¡Entendido!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSigned}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalSigned(!modalSigned);
        }}>
        <View style={modalStyles.centeredView}>
          <View style={[modalStyles.modalView, modalStyles.borderSigned]}>
            <Text style={modalStyles.modalText}>¡Bienvenido!</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[modalStyles.button, modalStyles.grayBackground]}
                onPress={() => setModalSigned(!modalSigned)}>
                <Text style={modalStyles.textStyle}>Cerrar</Text>
              </Pressable>
              <Pressable
                style={[modalStyles.button, modalStyles.violetBackground]}
                onPress={() => {
                  navigation.navigate('Login');
                  setModalSigned(!modalSigned);
                }}>
                <Text style={modalStyles.textStyle}>Iniciar Sesión</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{flex: 1}}>
        <View style={[styles.container, {flexDirection: 'row'}]}>
          <TouchableOpacity style={[squareButtonOn.base]} onPress={onPressLogin}>
            <View>
              <Text style={squareButtonOn.text}>¿Ya tienes una cuenta?</Text>
              <Text style={[squareButtonOn.text, {fontSize: 30}]}>INICIA SESIÓN AQUÍ</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[formStyles.input_container, {marginBottom: 100}]}>
          <Text style={[styles.title, {lineHeight: 100}]}>Formulario de Registro</Text>
          <Controller
            name="name"
            defaultValue=""
            control={control}
            rules={{
              required: {value: true, message: 'Escribe tu nombre'},
            }}
            render={({field: {onChange, value}}) => (
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
          <Button color={palette.violet} onPress={handleSubmit(onSubmit)} label="Registrarse" />
        </View>
      </View>
    </ScrollView>
  );
}
export const formStyles = StyleSheet.create({
  input_container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const squareButtonOn = StyleSheet.create({
  base: {
    flex: 1,
    borderColor: '#fff',
    backgroundColor: palette.red,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
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
    borderWidth: 4,
    borderRadius: 10,
    padding: 20,
    width: 350,
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
  borderWarning: {
    borderColor: '#ed1c24',
  },
  borderSigned: {
    borderColor: palette.violet,
  },
  button: {
    borderRadius: 10,
    width: 150,
    height: 80,
    elevation: 10,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: palette.violet,
  },
  redBackground: {
    backgroundColor: '#ed1c24',
  },
  violetBackground: {
    backgroundColor: palette.violet,
  },
  grayBackground: {
    backgroundColor: palette.gray,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 80,
    fontSize: 20,
  },
  modalText: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

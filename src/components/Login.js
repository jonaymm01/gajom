import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useForm, Controller} from 'react-hook-form';
import {UserContext} from '../../global';

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
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [activeUser, setUser] = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);

  const onPressSignup = () => navigation.navigate('Signup');

  const {handleSubmit, control, formState: {errors}} = useForm();

  const showPass = () => {
    setHiddenPassword(!hiddenPassword);
  };

  const onSubmit = async (value) => {
    await setActive(JSON.stringify(value)).then((pass) => {
      if (pass?.pass) {
        setUser(pass.user);
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
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled" style={{backgroundColor: '#fff'}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          style={styles.blank_background}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
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
                  <TouchableOpacity style={[squareButtonOn.base]} onPress={onPressSignup}>
                    <View>
                      <Text style={squareButtonOn.text}>¿No tienes cuenta en Gajom?</Text>
                      <Text style={[squareButtonOn.text, {fontSize: 30}]}>REGÍSTRATE AQUÍ</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[formStyles.input_container, {marginBottom: 100}]}>
                  <Text style={[styles.title, {lineHeight: 100}]}>Accede a tu cuenta en Gajom</Text>
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
                      <>
                        <Input
                          error={errors.password}
                          errorText={errors?.password?.message}
                          onChangeText={(text) => onChange(text)}
                          value={value}
                          placeholder="Contraseña"
                          autoCapitalize="none"
                          autoCorrect={false}
                          textContentType="newPassword"
                          secureTextEntry={hiddenPassword ? true : false}
                          enablesReturnKeyAutomatically
                        />
                      </>
                    )}
                  />
                  <View style={{alignSelf: 'flex-end', marginTop: -80, marginRight: 10}}>
                    <TouchableOpacity onPress={() => {
                      showPass();
                    }} style={LoginStyle.eye}>
                      <Image source={(hiddenPassword) ? require('../../assets/eye_show_icon.png') : require('../../assets/eye_hidden_icon.png')} resizeMode='contain' style={{width: 40, height: 40}} />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 60}}>
                    <Button color={palette.violet} onPress={handleSubmit(onSubmit)} label="Iniciar sesión" />
                  </View>
                </View>
              </View>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}


export const formStyles = StyleSheet.create({
  input_container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingRight: 20,
    paddingLeft: 20,
  },
});

const LoginStyle = StyleSheet.create({
  deleteButton: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
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

const squareButtonOff = StyleSheet.create({
  base: {
    flex: 1,
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    color: palette.red,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 120,
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
    backgroundColor: '#fff',
    borderColor: '#ed1c24',
    borderWidth: 4,
    borderRadius: 10,
    height: 400,
    padding: 50,
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
    color: '#fff',
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

import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';

import {ProfileListContext, ProfileContext} from '../../global';

import {createProfile, setActiveProfile} from '../_helpers/storage';
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
  const [hiddenPin, setHiddenPin] = useState(true);
  const [modalSigned, setModalSigned] = useState(false);

  const [profileList, setProfileList] = useContext(ProfileListContext);
  const [activeProfile, setProfile] = useContext(ProfileContext);

  const [newProfile, setNewProfile] = useState('');

  const onPressLogin = () => navigation.navigate('Login');

  const {handleSubmit, control, formState: {errors}, getValues} = useForm();

  const showPass = () => {
    setHiddenPin(!hiddenPin);
  };

  const onSubmit = async (value) => {
    setNewProfile({name: value.name, pin: value.pin});
    const profile = await AsyncStorage.getItem(value.name);
    if (profile) {
      setModalWarning(true);
    } else {
      await createProfile(value)
      const keys = await AsyncStorage.getAllKeys();
      const resultKeys = keys.filter((key) => key != 'active'); 
      setProfileList(resultKeys);
      setModalSigned(true);
    };
  };

  const onLogin = async () => {
    setProfile(JSON.stringify(newProfile));
    setActiveProfile(JSON.stringify(newProfile));
    console.log(newProfile.name, 'ha abierto la sesión');
  } 

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled" style= {{backgroundColor: '#fff'}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          style={styles.blank_background}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
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
                    <Text style={modalStyles.modalText}>Ya existe un perfil con este nombre.</Text>
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
                    <Text style={modalStyles.modalText}>¡Bienvenido, {newProfile.name}!</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Pressable
                        style={[modalStyles.button, modalStyles.grayBackground]}
                        onPress={() => setModalSigned(!modalSigned)}>
                        <Text style={modalStyles.textStyle}>Cerrar</Text>
                      </Pressable>
                      <Pressable
                        style={[modalStyles.button, modalStyles.violetBackground]}
                        onPress={() => {
                          onLogin();
                          setModalSigned(!modalSigned);
                        }}>
                        <Text style={modalStyles.textStyle}>Iniciar Sesión</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>

              <View style={{flex: 1}}>
                <View style={[styles.container, {flexDirection: 'row', alignSelf: 'center'}]}>
                  <TouchableOpacity style={[backButton.base]} onPress={onPressLogin}>
                    <View>
                      <Text style={[backButton.text]}>⤺</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[formStyles.input_container, {marginBottom: 30}]}>
                  <Text style={[styles.title, {lineHeight: 100}]}>Creación de perfil</Text>
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
                    name="pin"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: {value: true, message: 'Escribe un pin de 4 cifras'},
                      pattern: {
                        value: /^\d{4}$/,
                        message: 'invalid pin',
                      },
                    }}
                    render={({field: {onChange, value}}) => (
                      <>
                        <Input
                          error={errors.pin}
                          errorText={errors?.pin?.message}
                          onChangeText={(text) => onChange(text)}
                          value={value}
                          placeholder="Pin"
                          autoCapitalize="none"
                          autoCorrect={false}
                          textContentType="newPassword"
                          secureTextEntry={hiddenPin ? true : false}
                          enablesReturnKeyAutomatically
                        />
                        <View style={{alignSelf: 'flex-end', marginTop: (errors?.pin?.message?.length > 0) ? -103 : -80, marginRight: 10}}>
                          <TouchableOpacity onPress={() => {
                            showPass();
                          }} style={SignupStyle.eye}>
                            <Image source={(hiddenPin) ? require('../../assets/eye_show_icon.png') : require('../../assets/eye_hidden_icon.png')} resizeMode='contain' style={{width: 40, height: 40}} />
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  />
                  <View style={{marginTop: 60}}>
                    <Button color={palette.violet} onPress={handleSubmit(onSubmit)} label="Registrarse" />
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
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const SignupStyle = StyleSheet.create({
  deleteButton: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
  },
});


const backButton = StyleSheet.create({
  base: {
    backgroundColor: palette.gray,
    alignSelf: 'center',
    width: 80,
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
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

import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView, Switch} from 'react-native';
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

  const [pinEnabled, setPinEnabled] = useState(false);
  const toggleSwitch = () => setPinEnabled(!pinEnabled);

  const [profileList, setProfileList] = useContext(ProfileListContext);
  const [activeProfile, setProfile] = useContext(ProfileContext);

  const [newProfile, setNewProfile] = useState('');

  const onPressLogin = () => navigation.navigate('Login');

  const {handleSubmit, control, formState: {errors}, getValues} = useForm();

  const showPass = () => {
    setHiddenPin(!hiddenPin);
  };

  const onSubmit = async (value) => {
    const profile = await AsyncStorage.getItem(value.name);
    if (profile) {
      setModalWarning(true);
    } else {
      if (pinEnabled) {
        await createProfile(value)
        const keys = await AsyncStorage.getAllKeys();
        const resultKeys = keys.filter((key) => key != 'active'); 
        setProfileList(resultKeys);
        setModalSigned(true);
        setNewProfile({name: value.name, pin: value.pin});
      } else {
        await createProfile({name: value.name, pin: '0'})
        const keys = await AsyncStorage.getAllKeys();
        const resultKeys = keys.filter((key) => key != 'active'); 
        setProfileList(resultKeys);
        setModalSigned(true);
        setNewProfile({name: value.name, pin: '0'});
      }
    };
  };

  const onLogin = async () => {
    setProfile(JSON.stringify(newProfile));
    console.log(newProfile.name, 'ha abierto la sesión');
  } 

const pinInput = 
  <Controller
  name="pin"
  defaultValue=""
  control={control}
  rules={{
    required: {value: true, message: 'Escribe un pin de 4 cifras'},
    pattern: {
      value: /^\d{4}$/,
      message: 'Debe tener 4 cifras',
    },
  }}
  render={({field: {onChange, value}}) => (
    <>
      <Input
        keyboardType="numeric"
        error={errors.pin}
        errorText={errors?.pin?.message}
        onChangeText={(text) => onChange(text)}
        value={value}
        placeholder="PIN"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="newPassword"
        secureTextEntry={hiddenPin ? true : false}
        enablesReturnKeyAutomatically
      />
      <View style={{alignSelf: 'flex-end', marginTop: (errors?.pin?.message?.length > 0) ? -103 : -80, marginRight: 10}}>
        <TouchableOpacity onPress={() => {
          showPass();
        }}>
          <Image source={(hiddenPin) ? require('../../assets/eye_hidden_icon.png') : require('../../assets/eye_show_icon.png')} resizeMode='contain' style={{width: 40, height: 40}} />
        </TouchableOpacity>
      </View>
    </>
  )}
  />

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled" style= {{backgroundColor: '#fff'}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          style={styles.blank_background}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <Modal
                animationType="fade"
                visible={modalWarning}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalWarning(!modalWarning);
                }}>
                  <View style={styles.modalView}>
                    <Image source={require('../../assets/warning.png')} resizeMode='contain' style={{width: 80, height: 80}} />
                    <Text style={modalStyles.modalText}>Ya existe un perfil con este nombre.</Text>
                    <Pressable
                      style={[modalStyles.button, modalStyles.redBackground]}
                      onPress={() => setModalWarning(!modalWarning)}>
                      <Text style={modalStyles.textStyle}>¡Entendido!</Text>
                    </Pressable>
                  </View>
              </Modal>

              <Modal
                animationType="fade"
                visible={modalSigned}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalSigned(!modalSigned);
                }}>
                <View style={[styles.modalView, {marginTop: 100}]}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[modalStyles.title]}>¡PERFIL AÑADIDO!</Text>
                  </View>
                  <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{borderWidth: 4, borderColor: palette.violet, paddingTop: 40, paddingBottom: 40, paddingRight: 20, paddingLeft: 20}}>
                      <View style={{width: 250}}>
                        <Text style={modalStyles.profile}>{newProfile.name}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', flex: 2}}>
                    <Pressable
                      style={[modalStyles.button, modalStyles.grayBackground, {flex: 1}]}
                      onPress={() => setModalSigned(!modalSigned)}>
                      <Text style={modalStyles.textStyle}>Volver</Text>
                    </Pressable>
                    <Pressable
                      style={[modalStyles.button, modalStyles.violetBackground, {flex: 2}]}
                      onPress={() => {
                        onLogin();
                        setModalSigned(!modalSigned);
                      }}>
                      <Text style={modalStyles.textStyle}>Iniciar Sesión</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>

              <View style={{flex: 1}}>
                
                <View style={[styles.container, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20}]}>
                  <TouchableOpacity style={[backButton.base]} onPress={onPressLogin}>
                    <View>
                      <Text style={[backButton.text]}>⤺</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={SignupStyle.titleContainer}>
                   <Text style={[SignupStyle.title]}>Creación de perfil</Text>
                  </View>
                </View>

                
                <View style={[formStyles.input_container, {marginTop: 10}]}>
                <Text style={{fontSize: 22, fontWeight: 'bold', color: palette.violet, marginBottom: 10}}>Introduce un nombre:</Text>
                  <Controller
                    name="name"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: {value: true, message: 'Escribe un nombre'},
                    }}
                    render={({field: {onChange, value}}) => (
                      <Input
                        error={errors.name}
                        errorText={errors?.name?.message}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                        placeholder="Nombre del perfil"
                      />
                    )}
                  />
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10}}>
                    <Text style={{fontSize: 22, fontWeight: 'bold', color: palette.violet}}>Añadir un PIN?</Text>
                    <View style={SignupStyle.switch}>
                      <Switch
                        trackColor={{false: '#767577', true: palette.violet}}
                        thumbColor={pinEnabled ? palette.violet : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={pinEnabled}
                      />
                    </View>
                  </View>
                  <>
                    {(pinEnabled) ? pinInput : null}
                  </>
                  <View style={{marginTop: (pinEnabled) ? 60 : 20, paddingBottom: 20}}>
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
  switch: {
    marginLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }]
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: palette.violet,
  },
  titleContainer: {
    flex: 3,
    backgroundColor: 'white',
    borderColor: palette.violet,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
  }
});


const backButton = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: palette.gray,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
    alignSelf: 'center',
  },
});


const modalStyles = StyleSheet.create({
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
    fontSize: 25,
  },
  modalText: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    marginTop: 20,
    fontWeight: 'bold',
    color: palette.violet,
  },
  profile: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: palette.violet,

  }
});

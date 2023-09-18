import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useForm, Controller} from 'react-hook-form';
import {ProfileContext} from '../../global';

import { ProfileSelector } from './ProfileSelector';

import {setActiveProfile} from '../_helpers/storage';
import Input from '../components/Input';
import Button from '../components/Button';

import {styles, palette} from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { RotateInUpLeft } from 'react-native-reanimated';

/**
 * Componente: Inicio de sesión
 * @param {*} navigation
 * @return {JSX.Element}
 */
export function Login({navigation}) {
  const [hiddenPin, setHiddenPin] = useState(true);
  const [activeProfile, setProfile] = useContext(ProfileContext);

  const [selected, setSelected] = useState('');

  const [modalPin, setModalPin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onPressSignup = () => navigation.navigate('Signup');

  const {handleSubmit, control, formState: {errors}, getValues, resetField} = useForm();

  const showPass = () => {
    setHiddenPin(!hiddenPin);
  };

  useEffect(() => {
    if(selected != '') {
      setModalPin(!modalPin);
      const submit = async () => {
        await setActiveProfile(JSON.stringify(value)).then((pass) => {
          if (pass?.pass) {
            setActiveProfile(pass.profile);
            console.log(value.name, 'ha abierto la sesión');
            navigation.navigate('Profile');
          } else {
            setModalVisible(true);
          }
        });
      }
    }
  }, [selected]);

  const Access = async (value) => {
    const petition = {
      name: selected,
      pin: value.pin,
    }; 
    await setActiveProfile(JSON.stringify(petition)).then((pass) => {
      if (pass?.pass) {
        setProfile(pass.profile);
        setActiveProfile(pass.profile);
        console.log(value.name, 'ha abierto la sesión');
        navigation.navigate('Profile');
      } else {
        setModalVisible(true);
      }
    });
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    console.log(result);
  };

  return (
    <>
      <View style={{flex: 1, padding: 50}}>
          <TouchableOpacity style={[squareButtonOn.base]} onPress={onPressSignup}>
            <View>
              <Text style={[squareButtonOn.text, {fontSize: 30}]}>AÑADIR PERFIL</Text>
            </View>
          </TouchableOpacity>
      </View>
      <Modal
              avoidKeyboard = {true}
              animationType="slide"
              transparent={true}
              visible={modalPin}
              onRequestClose={() => {
                setModalPin(!modalPin);
              }}>
              <View style={[modalStyles.centeredView, modalStyles.modalView]}>
                <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: palette.violet}]}>{selected}</Text>
                <Controller
                  name="pin"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: {value: true, message: 'Inserta tu PIN'},
                  }}
                  render={({field: {onChange, value}}) => (
                    <Input
                      error={errors.pin}
                      errorText={errors?.pin?.message}
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                      }}
                      placeholder={activeProfile.name}
                    />
                  )}
                />
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[modalStyles.button, modalStyles.grayBackground]}
                    onPress={() => {
                      resetField('pin');
                      setModalPin(!modalPin);
                    }}
                  >
                    <Text style={modalStyles.textStyle}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={[modalStyles.button, modalStyles.violetBackground]}
                    onPress={() => {
                      handleSubmit(Access)();
                      resetField('pin');
                      setModalPin(!modalPin);
                    }}
                  >
                    <Text style={modalStyles.textStyle}>Iniciar sesión</Text>
                  </Pressable>
                </View>
              </View>
          </Modal>
        <View style={{flex: 5}}>
          <ProfileSelector selector={setSelected}/>
        </View>
    </>
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
    backgroundColor: 'white',
    borderColor: '#763CAD',
    borderWidth: 5,
    padding: 40,
    height: 500,
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
    width: 150,
    height: 80,
    elevation: 10,
    margin: 15,
  },
  violetBackground: {
    backgroundColor: palette.violet,
  },
  grayBackground: {
    backgroundColor: palette.gray,
  },
  redBackground: {
    backgroundColor: '#ed1c24',
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
});


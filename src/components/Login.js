import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useForm, Controller} from 'react-hook-form';
import {ProfileContext, ProfileListContext} from '../../global';

import { ProfileSelector } from './ProfileSelector';

import {hasPin, setActiveProfile} from '../_helpers/storage';
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
  const [profilesList, setProfilesList] = useContext(ProfileListContext);
  const [selected, setSelected] = useState('');

  const [modalPin, setModalPin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onPressSignup = () => navigation.navigate('Signup');

  const {handleSubmit, control, formState: {errors}, getValues, resetField} = useForm();

  const showPass = () => {
    setHiddenPin(!hiddenPin);
  };

  const Access = async (value) => {
    const petition = {
      name: selected,
      pin: value.pin,
    }; 
    console.log(petition);
    await setActiveProfile(JSON.stringify(petition)).then((pass) => {
      if (pass?.pass) {
        setProfile(pass.profile);
        console.log(selected, 'ha abierto la sesión');
        setSelected('');
      } else {
        setModalVisible(!modalVisible);
        setSelected('');
      }
    });
  };


  useEffect(() => {
    const lock = async () => hasPin(selected).then((lock) => {
      if(selected != '') {
        if (lock == true) {
          setModalPin(!modalPin);
        } else {
          const login = async () => {
            await setActiveProfile(JSON.stringify({name: selected, pin: '0'})).then((pass) => {
              if (pass?.pass) {
                setProfile(pass.profile);
                console.log(selected, 'ha abierto la sesión');
              } else {
                setModalVisible(true);
              }
            });
          }
          login();
          setSelected('');
        }
      }
    });
    lock();
  }, [selected]);

  const selector = 
    <View style={{flex: 5}}>
      <ProfileSelector selector={setSelected}/>
    </View>

  const emptyListWarning = 
  <View style={{flex: 4, justifyContent: 'center', alignSelf: 'center', paddingLeft: 20, paddingRight: 20, marginBottom: 100}}>
    <Text style={[{fontSize: 20}]}>Aún no has creado ningún perfil.</Text>
  </View>

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
                <Text style={[accessForm.text, {marginTop: 40}]}>Iniciando sesión:</Text>
                <Text style={[accessForm.profile_name, {marginBottom: 10, marginTop: 10}]}>{selected}</Text>
                <Text style={[accessForm.text, {marginBottom: 20,}]}>Introduce aquí tu PIN</Text>
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
                          }} >
                            <Image source={(hiddenPin) ? require('../../assets/eye_hidden_icon.png') : require('../../assets/eye_show_icon.png')} resizeMode='contain' style={{width: 40, height: 40}} />
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  />
                <View style={{flexDirection: 'row', marginTop: 40}}>
                  <Pressable
                    style={[modalStyles.button, modalStyles.grayBackground]}
                    onPress={() => {
                      resetField('pin');
                      setSelected('');
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
                      setSelected('');
                      setModalPin(!modalPin);
                    }}
                  >
                    <Text style={modalStyles.textStyle}>Acceder</Text>
                  </Pressable>
                </View>
              </View>
          </Modal>
        
          <>
            {(profilesList.length > 0) ? selector : emptyListWarning}
          </>
    
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

const accessForm = StyleSheet.create({
  profile_name: {
    fontSize: 40,
    fontWeight: 'bold',
    color: palette.violet,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: palette.violet,
  }
});

const squareButtonOn = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: palette.gray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    elevation: 10,

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
    width: 130,
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


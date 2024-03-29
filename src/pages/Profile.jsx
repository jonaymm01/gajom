import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Image, Modal, Pressable, ScrollView, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useForm, Controller} from 'react-hook-form';

import Button from '../components/Button';
import Input from '../components/Input';
import Separator from '../components/Separator';
import LineSeparator from '../components/LineSeparator';

import {styles, palette, dp} from '../styles/styles';
import {ProfileContext} from '../../global';
import {ProfileListContext} from '../../global';

import {setActiveProfile, renameProfile, getAllProfiles} from '../_helpers/storage';
import { delPin } from '../_helpers/ProfileContent';

/**
 * Renderiza la página de perfil de usuario.
 * @param {any} navigation
 * @return {JSX.Element}
 */
export function Profile({navigation}) {
  const [profile, setProfile] = useContext(ProfileContext);
  const [profileList, setProfileList] = useContext(ProfileListContext);


  if ((profile !== '{}') || (typeof(profile) != 'undefined')) {
    const activeProfile = JSON.parse(profile);

    const [newName, setNewName] = useState('');
    const [modalName, setModalName] = useState(false);
    const [modalWarning, setModalWarning] = useState(false);
    const [modalPin, setModalPin] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const {handleSubmit, control, formState: {errors}, getValues, resetField} = useForm();

    /**
   * Selector del Modal que se desplegará.
   * @param {*} flag
   */
    const openChange = async (flag) => {
      switch (flag) {
        case 'name':
          setNewName('');
          setModalName(true);
          break;
        case 'pin':
          setModalPin(true);
          break;
      }
    };

    /**
   * Método para cambiar el nombre de usuario.
   * @param {*} value
   */
    const changeName = async (value) => {
      const duplicate = await AsyncStorage.getItem(value.name);
      if (duplicate) {
        setModalWarning(!modalWarning);
        setNewName('');
      } else {
      const newName = value.name;
      await renameProfile(activeProfile.name, newName);
      const modified = await AsyncStorage.getItem(newName);
      const newProfile = JSON.parse(modified);
      setActiveProfile(modified).then((pass) => {
        if (pass?.pass) {
          setProfile(pass.profile);
          getAllProfiles().then((profiles) => setProfileList(profiles));
        };
      setModalName(!modalName);
      }); 
      }
      resetField('name');
    };

    /**
   * Método para cambiar el PIN del usuario.
   * @param {*} value
   */
    const changePin = async (value) => {
      const change_type = (activeProfile.pin == '0') ? 'añadido' : 'cambiado';
      await AsyncStorage.mergeItem(activeProfile.name, JSON.stringify({pin: value.pin2}));
      const modified = await AsyncStorage.getItem(activeProfile.name);
      setProfile(modified);
      console.log(`Se ha cambiado el PIN de`, activeProfile.pin, ' por: ', value.pin2);
      Alert.alert('¡Hecho!', `Se ha ${change_type} correctamente el PIN.`, [
        {text: 'OK'},
      ],
      {
        cancelable: true,
      });
      setModalPin(!modalPin);
    };

    const invalidPin= async (value) => {
      console.log(getValues().pin, " y ", getValues().pin2)
      if (isNaN(getValues().pin)) {
        Alert.alert('¡Ups!', 'El PIN debe ser un número de 4 cifras.', [
          {text: 'OK'},
        ],
        {
          cancelable: true,
        });
      } else if (getValues().pin != getValues().pin2) {
        Alert.alert('¡Ups!', 'El PIN debe coincidir.', [
          {text: 'OK'},
        ],
        {
          cancelable: true,
        });
      } else {
        Alert.alert('¡Ups!', 'PIN inválido', [
          {text: 'OK'},
        ],
        {
          cancelable: true,
        });
      }
    };

    /**
   * Método para eliminar el usuario
   * @param {*} value
   */
    const deleteProfile = async (value) => {
      await AsyncStorage.removeItem(activeProfile.name);
      setProfile('{}');
      const keys = await AsyncStorage.getAllKeys();
      const resultKeys = keys.filter((key) => key != 'active'); 
      setProfileList(resultKeys);
      console.log('Se ha eliminado el perfil ', activeProfile.name);
    };

    /**
   * Método para cerrar sesión
   * @param {*} value
   */
    const logOut = async (value) => {
      setProfile('{}');
      setActiveProfile('{}');
      console.log('El usuario ', activeProfile.name, ' ha cerrado sesión');
    };

    /**
   * Método para eliminar PIN
   */
    const deletePIN = async () => {
      delPin(activeProfile.name);
      const modified = await AsyncStorage.getItem(activeProfile.name);
      setProfile(modified);
      console.log('Se ha eliminado el PIN de', activeProfile.name);
      Alert.alert('¡Aviso!', 'Ahora tu cuenta no tiene PIN.', [
        {text: 'OK'},
      ],
      {
        cancelable: true,
      });
    };

    const deletePinButton = 
      <View style={{flexDirection: 'row', marginTop: dp(20)}}>
        <Button img={require('../../assets/open_lock.png')} color={palette.gray} onPress={() => deletePIN()} label="Eliminar PIN"/>
      </View >

    return (
      <ScrollView style={{backgroundColor: '#fff'}} keyboardShouldPersistTaps='handled'>
        <Modal
          animationType="fade"
          visible={modalWarning}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalWarning(!modalWarning);
          }}>
            <View style={styles.modalView}>
              <Image source={require('../../assets/warning.png')} resizeMode='contain' style={{width: dp(80), height: dp(80)}} />
              <Text style={modalStyles.modalText}>Ya existe un perfil con este nombre.</Text>
              <Pressable
                style={[modalStyles.button, modalStyles.redBackground]}
                onPress={() => setModalWarning(!modalWarning)}>
                <Text style={modalStyles.textStyle}>¡Entendido!</Text>
              </Pressable>
            </View>
        </Modal>
        <Modal
          avoidKeyboard = {true}
          animationType="fade"
          visible={modalName}
          onRequestClose={() => {
            setModalName(!modalName);
          }}>
          <View style={[styles.modalView, {justifyContent: 'center'}]}>
            <View style={{flexDirection: 'row', paddingLeft: dp(10), paddingRight: dp(10), borderWidth: dp(3), borderColor: palette.violet}}>
              <Text style={[styles.title, {marginBottom: dp(20), marginTop: dp(20), color: palette.violet, textDecorationLine: 'line-through'}]}> {activeProfile.name} </Text>
              <Text style={[styles.title, {marginBottom: dp(20), marginTop: dp(20), color: palette.violet}]}> ➜ {(newName == '') ? ' _____' : newName} </Text>
            </View>
            <Text style={[styles.title, {marginBottom: dp(20), marginTop: dp(40), color: palette.violet, fontSize: dp(25)}]}>Indica un nuevo nombre</Text>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              rules={{
                required: {value: true, message: 'Escribe tu nombre'},
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  maxLength={12}
                  textAlign={"center"}
                  error={errors.name}
                  errorText={errors?.name?.message}
                  onChangeText={(text) => {
                    setNewName(text);
                    onChange(text);
                  }}
                  value={value}
                  placeholder={activeProfile.name}
                  autoCapitalize='sentences'
                />
              )}
            />
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[modalStyles.button, modalStyles.grayBackground]}
                onPress={() => {
                  resetField('name');
                  setModalName(!modalName);
                }}
              >
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[modalStyles.button, modalStyles.violetBackground]}
                onPress={() => {
                  handleSubmit(changeName)();
                }}
              >
                <Text style={modalStyles.textStyle}>Aplicar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          visible={modalPin}
          onRequestClose={() => {
            setModalPin(!modalPin);
          }}>
          <View style={styles.modalView}>
            <Text style={[styles.title, {marginBottom: dp(20), marginTop: dp(40), color: palette.violet, fontSize: dp(30)}]}>Indica un nuevo PIN</Text>
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
                <Input
                  textAlign={'center'}
                  maxLength={4}
                  keyboardType="numeric"
                  error={errors.pin}
                  errorText={errors?.pin?.message}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder="PIN"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                  enablesReturnKeyAutomatically
                  showHide={true}
                />
              )}
            />
            <Controller
              name="pin2"
              defaultValue=""
              control={control}
              rules={{
                required: {value: true, message: 'Escribe tu PIN'},
                validate: () => getValues('pin') === getValues('pin2'),
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  textAlign={'center'}
                  maxLength={4}
                  keyboardType="numeric"
                  error={errors.pin2}
                  errorText={errors?.pin2?.message}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder="Repítelo"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                  enablesReturnKeyAutomatically
                  showHide={true}
                />
              )}
            />
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[modalStyles.button, modalStyles.grayBackground]}
                onPress={() => {
                  setModalPin(!modalPin);
                  resetField('pin');
                  resetField('pin2');
                }}
              >
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[modalStyles.button, modalStyles.violetBackground]}
                onPress={() => {
                  handleSubmit(changePin, invalidPin)().then(() => {
                    resetField('pin');
                    resetField('pin2');
                  });
                }}
              >
                <Text style={modalStyles.textStyle}>Aplicar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          visible={modalDelete}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalDelete(!modalDelete);
          }}>
          <View style={styles.modalView}>
              <Image source={require('../../assets/warning.png')} resizeMode='contain' style={{width: dp(80), height: dp(80)}} />
              <Text style={modalStyles.modalText}>Esto eliminará el usuario. ¿Desea continuar?</Text>

              <Pressable
                style={[modalStyles.button, modalStyles.redBackground]}
                onPress={() => {
                  handleSubmit(deleteProfile)();
                  setModalDelete(!modalDelete);
                }}
              >
                <Text style={modalStyles.textStyle}>Sí, eliminar</Text>
              </Pressable>
              <Pressable
                style={[modalStyles.button, modalStyles.grayBackground, {marginTop: dp(20)}]}
                onPress={() => setModalDelete(!modalDelete)}>
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </Pressable>
          </View>
        </Modal>

        <View style={[styles.container, {alignItems: 'center'}]}>
          <View style = {{alignItems: 'flex-start', marginTop: dp(40), alignItems: 'center'}}>
            <View style={{flex: 1, backgroundColor: palette.darkViolet, padding: dp(30), borderRadius: dp(10)}}>
              <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.basic_font, {color: '#fff', alignSelf: 'center', fontSize: dp(35), fontWeight: 'bold', textAlign: 'center'}]}>{activeProfile.name}</Text>
            </View>
            <View style={{marginBottom: dp(40)}}/>
            <View style={{flexDirection: 'row'}}>
              <Button img={require('../../assets/user_icon.png')} color={palette.violet} onPress={() => openChange('name')} label="Cambiar nombre" />
            </View >
            <View style={{flexDirection: 'row', marginTop: dp(20)}}>
              <Button img={require('../../assets/lock.png')} color={palette.violet} onPress={() => openChange('pin')} label={(activeProfile.pin == "0" || activeProfile.pin == undefined) ? "Añadir PIN" : "Cambiar PIN"}/>
            </View >
            <>
              {(activeProfile.pin == "0" || activeProfile.pin == undefined) ? null : deletePinButton}
            </>
            <View style={{marginTop: dp(40), marginBottom: dp(30), flexDirection: 'row', justifyContent: 'space-between', width: dp(150)}}>
                <View style={{backgroundColor: palette.gray, height: dp(10), width: dp(10), borderRadius: dp(2)}}/>
                <View style={{backgroundColor: palette.gray, height: dp(10), width: dp(10), borderRadius: dp(2)}}/>
                <View style={{backgroundColor: palette.gray, height: dp(10), width: dp(10), borderRadius: dp(2)}}/>
            </View>
            <View>
              <Button color={palette.red} onPress={() => logOut()} label="Cerrar sesión" />
            </View>
            <View style={{marginTop: dp(10), marginBottom: dp(20)}}>
              <Button color={palette.gray} onPress={() => setModalDelete(!modalDelete)} label="Eliminar perfil" />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const modalStyles = StyleSheet.create({
  button: {
    borderRadius: dp(10),
    width: dp(150),
    height: dp(80),
    elevation: dp(10),
    margin: dp(15),
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
    lineHeight: dp(80),
    fontSize: dp(25),
  },
  modalText: {
    marginBottom: dp(40),
    textAlign: 'center',
    fontSize: dp(24),
    marginTop: dp(20),
    fontWeight: 'bold',
  },
});

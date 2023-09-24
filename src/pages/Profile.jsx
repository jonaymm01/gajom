import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Image, Modal, Pressable, ScrollView, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';

import Button from '../components/Button';
import Input from '../components/Input';
import Separator from '../components/Separator';
import LineSeparator from '../components/LineSeparator';

import {styles, palette} from '../styles/styles';
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
      const newName = value.name;
      await renameProfile(activeProfile.name, newName);
      const modified = await AsyncStorage.getItem(newName);
      const newProfile = JSON.parse(modified);
      setActiveProfile(modified).then((pass) => {
        if (pass?.pass) {
          setProfile(pass.profile);
          getAllProfiles().then((profiles) => setProfileList(profiles));
        };
      });
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
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Image source={require('../../assets/open_lock.png')} resizeMode='contain' style={{maxHeight: 40, maxWidth: 60, alignSelf: 'center', tintColor: palette.gray}}/>
        <Button color={palette.gray} onPress={() => deletePIN()} label="Eliminar PIN"/>
      </View >

    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <Modal
          avoidKeyboard = {true}
          animationType="fade"
          visible={modalName}
          onRequestClose={() => {
            setModalName(!modalName);
          }}>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: palette.violet, textDecorationLine: 'line-through'}]}> {activeProfile.name} </Text>
              <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: palette.violet}]}> ➜ {newName} </Text>
            </View>
            <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: palette.violet}]}>Indica un nuevo nombre</Text>
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
                  onChangeText={(text) => {
                    setNewName(text);
                    onChange(text);
                  }}
                  value={value}
                  placeholder={activeProfile.name}
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
                  resetField('name');
                  setModalName(!modalName);
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
            <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: palette.violet}]}>Indica un nuevo PIN</Text>
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
                  keyboardType="numeric"
                  error={errors.pin}
                  errorText={errors?.pin?.message}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder="PIN"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                  secureTextEntry
                  enablesReturnKeyAutomatically
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
                  keyboardType="numeric"
                  error={errors.pin2}
                  errorText={errors?.pin2?.message}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder="Escríbelo de nuevo"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                  secureTextEntry
                  enablesReturnKeyAutomatically
                />
              )}
            />
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[modalStyles.button, modalStyles.grayBackground, {marginTop: 50}]}
                onPress={() => {
                  setModalPin(!modalPin);
                  resetField('pin');
                  resetField('pin2');
                }}
              >
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[modalStyles.button, modalStyles.violetBackground, {marginTop: 50}]}
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
              <Image source={require('../../assets/warning.png')} resizeMode='contain' style={{width: 80, height: 80}} />
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
                style={[modalStyles.button, modalStyles.grayBackground, {marginTop: 20}]}
                onPress={() => setModalDelete(!modalDelete)}>
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </Pressable>
          </View>
        </Modal>

        <View style={[styles.container, {alignItems: 'center'}]}>
          <View style = {{alignItems: 'flex-start', marginTop: 40, alignItems: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <View style = {{borderColor: palette.violet, borderWidth: 2, justifyContent: 'center', padding: 10, height: 50, marginRight: 25, borderRadius: 10}}>
                <View style={{backgroundColor: palette.violet, padding: 10, borderRadius: 5}}/>
              </View>
              <View style = {{borderColor: palette.violet, borderWidth: 2, alignItems: 'center', padding: 10, borderRadius: 10}}>
                <View style={{backgroundColor: palette.violet, padding: 20, maxWidth: 200, borderRadius: 5}}>
                  <Text style={[styles.basic_font, {color: '#fff', alignSelf: 'center', fontSize: 30, textAlign: 'center'}]}>{activeProfile.name}</Text>
                </View>
              </View>
              <View style = {{borderColor: palette.violet, borderWidth: 2, justifyContent: 'center', padding: 10, height: 50, marginLeft: 25, borderRadius: 10}}>
                <View style={{backgroundColor: palette.violet, padding: 10, borderRadius: 5}}/>
              </View>
            </View>
            <Separator> Editar perfil </Separator>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/user_icon.png')} resizeMode='contain' style={{maxHeight: 40, maxWidth: 60, alignSelf: 'center'}}/>
              <Button color={palette.violet} onPress={() => openChange('name')} label="Cambiar nombre" />
            </View >
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Image source={require('../../assets/lock.png')} resizeMode='contain' style={{maxHeight: 40, maxWidth: 60, alignSelf: 'center'}}/>
              <Button color={palette.violet} onPress={() => openChange('pin')} label={(activeProfile.pin == "0" || activeProfile.pin == undefined) ? "Añadir PIN" : "Cambiar PIN"}/>
            </View >
            <>
              {(activeProfile.pin == "0" || activeProfile.pin == undefined) ? null : deletePinButton}
            </>
            <LineSeparator/>
            <View style={{marginTop: -20}}>
              <Button color={palette.red} onPress={() => logOut()} label="Cerrar sesión" />
            </View>
            <View style={{marginTop: 10, marginBottom: 20}}>
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

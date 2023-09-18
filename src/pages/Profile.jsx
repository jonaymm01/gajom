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

import {setProfile, setActiveProfile} from '../_helpers/storage';

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
    const [active, loadActive] = useState(0);

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
      console.log('Se ha cambiado el nombre de', activeProfile.name, ' por: ', value.name);
      await AsyncStorage.mergeItem(activeProfile.name, JSON.stringify({name: value.name}));
      const modified = await AsyncStorage.getItem(activeProfile.name);
      setProfile(modified);
      console.log(modified);
    };

    /**
   * Método para cambiar la contraseña del usuario.
   * @param {*} value
   */
    const changePin = async (value) => {
      await AsyncStorage.mergeItem(activeProfile.name, JSON.stringify({pin: value.pin2}));
      const modified = await AsyncStorage.getItem(activeProfile.name);
      setProfile(modified);
      console.log('Se ha cambiado el PIN de', activeProfile.pin, ' por: ', value.pin2);
      Alert.alert('¡Hecho!', 'Se ha cambiado correctamente el PIN.', [
        {text: 'OK'},
      ],
      {
        cancelable: true,
      });
      setModalPin(!modalPin);
      console.log(modified);
    };

    const invalidPin= async (value) => {
      if (getValues().pin != getValues().pin2) {
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

    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <Modal
          avoidKeyboard = {true}
          animationType="slide"
          transparent={true}
          visible={modalName}
          onRequestClose={() => {
            setModalName(!modalName);
          }}>
          <View style={[modalStyles.centeredView, modalStyles.modalView]}>
            <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: palette.violet}]}>{activeProfile.name} ➜ {newName} </Text>
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
          animationType="slide"
          transparent={true}
          visible={modalPin}
          onRequestClose={() => {
            setModalPin(!modalPin);
          }}>
          <View style={[modalStyles.centeredView, modalStyles.modalView]}>
            <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: palette.violet}]}>Indica una nueva contraseña</Text>
            <Controller
              name="pin"
              defaultValue=""
              control={control}
              rules={{
                required: {value: true, message: 'Escribe tu contraseña'},
                validate: () => getValues('pin') === getValues('pin2'),
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  error={errors.pin}
                  errorText={errors?.pin?.message}
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
            <Controller
              name="pin2"
              defaultValue=""
              control={control}
              rules={{
                required: {value: true, message: 'Escribe tu contraseña'},
                validate: () => getValues('pin') === getValues('pin2'),
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  error={errors.pin2}
                  errorText={errors?.pin2?.message}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder="Repite la contraseña"
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
                }}
              >
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[modalStyles.button, modalStyles.violetBackground, {marginTop: 50}]}
                onPress={() => {
                  handleSubmit(changePin, invalidPin)();
                }}
              >
                <Text style={modalStyles.textStyle}>Aplicar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDelete}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalDelete(!modalDelete);
          }}>
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
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
          </View>
        </Modal>

        <View style={[styles.container, {alignItems: 'center'}]}>
          <View style = {{alignItems: 'flex-start', marginTop: 40, alignItems: 'center'}}>
            <View style = {{borderColor: palette.violet, borderWidth: 2, alignItems: 'center', padding: 50}}>
              <View>
                <Text style={[styles.basic_font, {color: palette.violet, marginBottom: 30, fontSize: 25}]}>Hola, {activeProfile.name}</Text>
              </View>
              <View style={{marginBottom: 30, backgroundColor: palette.violet, padding: 20}}>
                <Text style={[styles.basic_font_bold, {color: '#fff'}]}>Sesión iniciada:</Text>
                <Text style={[styles.basic_font, {color: '#fff'}]}>{activeProfile.name}</Text>
              </View>
            </View>
            <Separator> Editar perfil </Separator>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/user_icon.png')} resizeMode='contain' style={{maxHeight: 40, maxWidth: 60, alignSelf: 'center'}}/>
              <Button color={palette.violet} onPress={() => openChange('name')} label="Cambiar nombre" />
            </View >
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Image source={require('../../assets/lock.png')} resizeMode='contain' style={{maxHeight: 40, maxWidth: 60, alignSelf: 'center'}}/>
              <Button color={palette.violet} onPress={() => openChange('pin')} label="Cambiar contraseña"/>
            </View >
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
import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Image, Modal, Pressable, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';

import Button from '../components/Button';
import Input from '../components/Input';
import Separator from '../components/Separator';
import LineSeparator from '../components/LineSeparator';

import {styles, palette} from '../styles/styles';
import {UserContext} from '../../global';

/**
 * Renderiza la página de perfil de usuario.
 * @param {any} navigation
 * @return {JSX.Element}
 */
export function User({navigation}) {
  const [user, setUser] = useContext(UserContext);

  if ((user !== '{}') || (typeof(user) != 'undefined')) {
    const activeUser = JSON.parse(user);
    const [active, loadActive] = useState(0);

    const [modalName, setModalName] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const {handleSubmit, control, formState: {errors}, getValues} = useForm();

    /**
   * Selector del Modal que se desplegará.
   * @param {*} flag
   */
    const openChange = async (flag) => {
      switch (flag) {
        case 'name':
          setModalName(true);
          break;
        case 'email':
          setModalEmail(true);
          break;
        case 'password':
          setModalPassword(true);
          break;
      }
    };

    /**
   * Método para cambiar el nombre de usuario.
   * @param {*} value
   */
    const changeName = async (value) => {
      console.log('Se ha cambiado el nombre de', activeUser.email, ' por: ', value.name);
      await AsyncStorage.mergeItem(activeUser.email, JSON.stringify({name: value.name}));
      const modified = await AsyncStorage.getItem(activeUser.email);
      setUser(modified);
      console.log(modified);
    };

    /**
   * Método para cambiar la contraseña del usuario.
   * @param {*} value
   */
    const changePassword = async (value) => {
      await AsyncStorage.mergeItem(activeUser.email, JSON.stringify({password: value.password2}));
      const modified = await AsyncStorage.getItem(activeUser.email);
      setUser(modified);
      console.log('Se ha cambiado la contraseña de', activeUser.password, ' por: ', value.password2);
      Alert.alert('¡Hecho!', 'Se ha cambiado correctamente la contraseña.', [
        {text: 'OK'},
      ],
      {
        cancelable: true,
      });
      console.log(modified);
    };

    /**
   * Método para eliminar el usuario
   * @param {*} value
   */
    const deleteUser = async (value) => {
      await AsyncStorage.removeItem(activeUser.email);
      setUser('{}');
      console.log('Se ha eliminado el usuario ', activeUser.email);
      navigation.navigate('Login');
    };

    /**
   * Método para cerrar sesión
   * @param {*} value
   */
    const logOut = async (value) => {
      setUser('{}');
      console.log('El usuario ', activeUser.email, ' ha cerrado sesión');
      navigation.navigate('Login');
    };

    return (
      <ScrollView style={{backgroundColor: '#fff'}}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalName}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalName(!modalName);
          }}>
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={[styles.basic_font, {marginBottom: 20, marginTop: 40, color: palette.violet}]}>Indica un nuevo nombre</Text>
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
                    placeholder={activeUser.name}
                  />
                )}
              />
              <Pressable
                style={[modalStyles.button, modalStyles.buttonClose, {marginTop: 50}]}
                onPress={() => {
                  handleSubmit(changeName)();
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
          visible={modalPassword}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalPassword(!modalPassword);
          }}>
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={[styles.basic_font, {marginBottom: 20, marginTop: 40, color: palette.violet}]}>Indica una nueva contraseña</Text>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{
                  required: {value: true, message: 'Escribe tu contraseña'},
                  validate: () => getValues('password') === getValues('password2'),
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
              <Controller
                name="password2"
                defaultValue=""
                control={control}
                rules={{
                  required: {value: true, message: 'Escribe tu contraseña'},
                  validate: () => getValues('password') === getValues('password2'),
                }}
                render={({field: {onChange, value}}) => (
                  <Input
                    error={errors.password2}
                    errorText={errors?.password2?.message}
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
              <Pressable
                style={[modalStyles.button, modalStyles.buttonClose, {marginTop: 50}]}
                onPress={() => {
                  handleSubmit(changePassword)();
                  setModalPassword(!modalPassword);
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
                style={[modalStyles.button, modalStyles.buttonWarning]}
                onPress={() => {
                  handleSubmit(deleteUser)();
                  setModalDelete(!modalDelete);
                }}
              >
                <Text style={modalStyles.textStyle}>Sí, eliminar</Text>
              </Pressable>
              <Pressable
                style={[modalStyles.button, modalStyles.buttonClose, {marginTop: 20}]}
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
                <Text style={[styles.basic_font, {color: palette.violet, marginBottom: 30, fontSize: 25}]}>Hola, {activeUser.name}</Text>
              </View>
              <View style={{marginBottom: 30, backgroundColor: palette.violet, padding: 20}}>
                <Text style={[styles.basic_font_bold, {color: '#fff'}]}>Sesión iniciada:</Text>
                <Text style={[styles.basic_font, {color: '#fff'}]}>{activeUser.email}</Text>
              </View>
            </View>
            <Separator> Editar perfil </Separator>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/user_icon.png')} resizeMode='contain' style={{maxHeight: 40, maxWidth: 60, alignSelf: 'center'}}/>
              <Button color={palette.violet} onPress={() => openChange('name')} label="Cambiar nombre" />
            </View >
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Image source={require('../../assets/lock.png')} resizeMode='contain' style={{maxHeight: 40, maxWidth: 60, alignSelf: 'center'}}/>
              <Button color={palette.violet} onPress={() => openChange('password')} label="Cambiar contraseña"/>
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
    borderWidth: 10,
    borderRadius: 10,
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
    width: 200,
    height: 80,
    elevation: 10,
  },
  buttonOpen: {
    backgroundColor: '#763CAD',
  },
  buttonClose: {
    backgroundColor: '#763CAD',
  },
  buttonWarning: {
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

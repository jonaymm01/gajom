import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';

import {ProfileListContext, ProfileContext} from '../../global';

import {createProfile, setActiveProfile} from '../_helpers/storage';
import Input from '../components/Input';
import Button from '../components/Button';

import {styles, palette, dp, w_width} from '../styles/styles';

/**
 * Componente: Registro
 * @param {*} navigation
 * @return {JSX.Element}
 */
export function SignUp({navigation}) {
  const [modalWarning, setModalWarning] = useState(false);
  const [modalSigned, setModalSigned] = useState(false);

  const [pinEnabled, setPinEnabled] = useState(false);
  const toggleSwitch = () => setPinEnabled(!pinEnabled);

  const [profileList, setProfileList] = useContext(ProfileListContext);
  const [activeProfile, setProfile] = useContext(ProfileContext);

  const [newProfile, setNewProfile] = useState('');

  const onPressLogin = () => navigation.navigate('Login');

  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
  } = useForm();

  const onSubmit = async value => {
    const profile = await AsyncStorage.getItem(value.name);
    if (profile) {
      setModalWarning(true);
    } else {
      if (pinEnabled) {
        await createProfile(value);
        const keys = await AsyncStorage.getAllKeys();
        const resultKeys = keys.filter(key => key != 'active');
        setProfileList(resultKeys);
        setModalSigned(true);
        setNewProfile({name: value.name, pin: value.pin});
      } else {
        await createProfile({name: value.name, pin: '0'});
        const keys = await AsyncStorage.getAllKeys();
        const resultKeys = keys.filter(key => key != 'active');
        setProfileList(resultKeys);
        setModalSigned(true);
        setNewProfile({name: value.name, pin: '0'});
      }
    }
  };

  const onLogin = async () => {
    setProfile(JSON.stringify(newProfile));
    console.log(newProfile.name, 'ha abierto la sesión');
  };

  const pinInput = (
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
            textAlign={'center'}
            maxLength={4}
            keyboardType="numeric"
            error={errors.pin}
            errorText={errors?.pin?.message}
            onChangeText={text => onChange(text)}
            value={value}
            placeholder="PIN"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            enablesReturnKeyAutomatically
            showHide={true}
          />
        </>
      )}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={Platform.select({
          ios: () => dp(-80),
          android: () => dp(-80),
        })()}
        style={styles.blank_background}>
        <View>
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
                  <Image
                    source={require('../../assets/warning.png')}
                    resizeMode="contain"
                    style={{width: dp(80), height: dp(80)}}
                  />
                  <Text style={modalStyles.modalText}>
                    Ya existe un perfil con este nombre.
                  </Text>
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
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={[modalStyles.title]}>¡PERFIL AÑADIDO!</Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderWidth: 4,
                        borderColor: palette.violet,
                        paddingTop: 40,
                        paddingBottom: 40,
                        paddingRight: 20,
                        paddingLeft: 20,
                      }}>
                      <View style={{width: 250}}>
                        <Text style={modalStyles.profile}>
                          {newProfile.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', flex: 2}}>
                    <Pressable
                      style={[
                        modalStyles.button,
                        modalStyles.grayBackground,
                        {flex: 1},
                      ]}
                      onPress={() => {
                        setModalSigned(!modalSigned);
                        navigation.navigate('Login');
                      }}>
                      <Text style={modalStyles.textStyle}>Volver</Text>
                    </Pressable>
                    <Pressable
                      style={[
                        modalStyles.button,
                        modalStyles.violetBackground,
                        {flex: 2},
                      ]}
                      onPress={() => {
                        onLogin();
                        setModalSigned(!modalSigned);
                      }}>
                      <Text style={modalStyles.textStyle}>Iniciar Sesión</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>

              <View
                style={[
                  styles.container,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <TouchableOpacity
                  style={[backButton.base]}
                  onPress={onPressLogin}>
                  <View>
                    <Text style={[backButton.text]}>⤺</Text>
                  </View>
                </TouchableOpacity>
                <View style={SignupStyle.titleContainer}>
                  <Text adjustsFontSizeToFit style={[SignupStyle.title]}>
                    Nuevo perfil
                  </Text>
                </View>
              </View>

              <View style={{flex: 4}}>
                <Text
                  style={{
                    fontSize: dp(22),
                    fontWeight: 'bold',
                    color: palette.violet,
                    marginBottom: dp(10),
                  }}>
                  Introduce un nombre
                </Text>
                <Controller
                  name="name"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: {value: true, message: 'Escribe un nombre'},
                  }}
                  render={({field: {onChange, value}}) => (
                    <Input
                      maxLength={12}
                      textAlign={'center'}
                      error={errors.name}
                      errorText={errors?.name?.message}
                      onChangeText={text => onChange(text)}
                      value={value}
                      placeholder="Nombre del perfil"
                      autoCapitalize="sentences"
                    />
                  )}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: dp(10),
                  }}>
                  <Text
                    style={{
                      fontSize: dp(22),
                      fontWeight: 'bold',
                      color: palette.violet,
                    }}>
                    Añadir un PIN?
                  </Text>
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
                <>{pinEnabled ? pinInput : null}</>
                <View style={{paddingBottom: dp(20)}}>
                  <Button
                    color={palette.violet}
                    onPress={handleSubmit(onSubmit)}
                    label="Registrarse"
                  />
                </View>
              </View>
            </>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export const formStyles = StyleSheet.create({
  input_container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: dp(20),
    paddingRight: dp(20),
  },
});

const SignupStyle = StyleSheet.create({
  deleteButton: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: dp(10),
    padding: dp(20),
  },
  switch: {
    marginLeft: dp(20),
    paddingLeft: dp(20),
    paddingRight: dp(20),
    transform: [{scaleX: dp(1.8)}, {scaleY: dp(1.8)}],
  },
  title: {
    fontSize: dp(24),
    fontWeight: 'bold',
    color: palette.violet,
  },
  titleContainer: {
    flex: 3,
    backgroundColor: 'white',
    borderColor: palette.violet,
    borderWidth: dp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: dp(5),
    padding: dp(10),
  },
});

const backButton = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: palette.gray,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: dp(10),
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: dp(40),
    alignSelf: 'center',
  },
});

const modalStyles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: 150,
    height: 80,
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
    fontSize: dp(25),
  },
  modalText: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: dp(24),
    marginTop: 20,
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: dp(35),
    marginTop: 20,
    fontWeight: 'bold',
    color: palette.violet,
  },
  profile: {
    textAlign: 'center',
    fontSize: dp(30),
    fontWeight: 'bold',
    color: palette.violet,
  },
});

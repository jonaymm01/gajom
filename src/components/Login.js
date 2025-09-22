import React, {useState, useContext, useEffect} from 'react';
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useForm, Controller} from 'react-hook-form';
import {ProfileContext, ProfileListContext} from '../../global';

import {ProfileSelector} from './ProfileSelector';

import {hasPin, setActiveProfile} from '../_helpers/storage';
import Input from '../components/Input';
import Button from '../components/Button';

import {styles, palette, dp} from '../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {RotateInUpLeft} from 'react-native-reanimated';

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
  const [isSelected, markSelected] = useState(false);

  const [modalPin, setModalPin] = useState(false);

  const onPressSignup = () => navigation.navigate('Signup');

  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
    resetField,
  } = useForm();

  const showPass = () => {
    setHiddenPin(!hiddenPin);
  };

  const Access = async value => {
    const petition = {
      name: selected,
      pin: value.pin,
    };
    await setActiveProfile(JSON.stringify(petition)).then(pass => {
      if (pass?.pass) {
        console.log(selected, 'ha abierto la sesión con PIN');
        setProfile(pass.profile);
        setModalPin(!modalPin);
        setSelected('');
      } else {
        resetField('pin');
        Alert.alert('¡Ups!', 'Pin incorrecto.', [{text: 'OK'}], {
          cancelable: true,
        });
      }
    });
  };

  useEffect(() => {
    const lock = async () =>
      hasPin(selected).then(lock => {
        if (selected != '') {
          if (lock == true) {
            setModalPin(!modalPin);
          } else {
            const login = async () => {
              await setActiveProfile(
                JSON.stringify({name: selected, pin: '0'}),
              ).then(pass => {
                if (pass?.pass) {
                  console.log(selected, 'ha abierto la sesión sin PIN');
                  setProfile(pass.profile);
                } else {
                }
              });
            };
            login();
            setSelected('');
          }
        }
      });
    lock();
  }, [selected]);

  useEffect(() => {
    !modalPin ? setSelected('') : null;
  }, [modalPin]);

  const selector = (
    <View style={{flex: 5}}>
      <ProfileSelector selector={setSelected} />
    </View>
  );

  const emptyListWarning = (
    <View
      style={{
        flex: 4,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingLeft: dp(20),
        paddingRight: dp(20),
        marginBottom: dp(100),
      }}>
      <Text
        style={[{fontSize: dp(20), color: palette.red, fontWeight: 'bold'}]}>
        Aún no has creado ningún perfil.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, padding: dp(50)}}>
        <TouchableOpacity style={[squareButtonOn.base]} onPress={onPressSignup}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[squareButtonOn.text, {fontSize: dp(30)}]}>
              AÑADIR PERFIL
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        avoidKeyboard={true}
        animationType="fade"
        visible={modalPin}
        onRequestClose={() => {
          setModalPin(!modalPin);
        }}>
        <View style={styles.modalView}>
          <View style={[accessForm.profileButton, {marginBottom: dp(40)}]}>
            <View
              style={[
                styles.button_container,
                {flex: 10, justifyContent: 'center'},
              ]}>
              <Text style={[styles.button_text, {fontSize: dp(24)}]}>
                {selected}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
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
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[modalStyles.button, modalStyles.grayBackground]}
                onPress={() => {
                  resetField('pin');
                  setSelected('');
                  setModalPin(!modalPin);
                }}>
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[modalStyles.button, modalStyles.violetBackground]}
                onPress={() => {
                  handleSubmit(Access)();
                }}>
                <Text style={modalStyles.textStyle}>Acceder</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <>{profilesList.length > 0 ? selector : emptyListWarning}</>
    </SafeAreaView>
  );
}

export const formStyles = StyleSheet.create({
  input_container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingRight: dp(20),
    paddingLeft: dp(20),
  },
});

const accessForm = StyleSheet.create({
  text: {
    fontSize: dp(22),
    color: palette.violet,
  },
  profileButton: {
    backgroundColor: palette.violet,
    margin: dp(10),
    height: dp(140),
    width: dp(140),
    padding: dp(10),
    borderRadius: dp(15),
  },
});

const squareButtonOn = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: palette.gray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: dp(20),
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: dp(20),
    alignSelf: 'center',
  },
});

const squareButtonOff = StyleSheet.create({
  base: {
    flex: 1,
    borderWidth: dp(5),
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
    lineHeight: dp(120),
  },
});

const modalStyles = StyleSheet.create({
  button: {
    borderRadius: dp(10),
    width: dp(130),
    height: dp(80),
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
    fontSize: 25,
  },
  modalText: {
    marginBottom: dp(40),
    textAlign: 'center',
    fontSize: 24,
    marginTop: dp(20),
    fontWeight: 'bold',
  },
});

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
import {ProfileListContext} from '../../global';

import {setActiveProfile, hasPin} from '../_helpers/storage';
import Input from '../components/Input';
import Button from '../components/Button';

import {styles, palette, dp} from '../styles/styles';

/**
 * Componente: Selector de perfil
 * @param {*} props
 * @return {JSX.Element}
 */
export function ProfileSelector({...props}) {
  const [hiddenPin, setHiddenPin] = useState(true);
  const [profileList, setProfileList] = useContext(ProfileListContext);
  const [pinsBoolArray, setPinsBoolArray] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();

  const showPass = () => {
    setHiddenPin(!hiddenPin);
  };

  let pinIs = [];

  const pinsBool = async () => {
    pinIs = await Promise.all(
      profileList.map(async profile => await hasPin(profile)),
    );
    return pinIs;
  };

  useEffect(() => {
    pinsBool().then(pins => setPinsBoolArray(pins));
  }, [profileList]);

  buttonlist = profileList.map((profile, index) => (
    <View key={index} style={{justifyContent: 'center', padding: dp(5)}}>
      <TouchableOpacity
        style={selectorStyles.profileButton}
        onPress={() => props.selector(profile)}>
        <View style={{flex: 1, alignSelf: 'flex-end'}}>
          {pinsBoolArray[index] ? (
            <Image
              source={require('../../assets/lock.png')}
              tintColor={'white'}
              resizeMode="contain"
              style={{maxWidth: dp(25), maxHeight: dp(25)}}
            />
          ) : null}
        </View>
        <View
          style={[
            styles.button_container,
            {flex: 10, justifyContent: 'center'},
          ]}>
          <Text style={[styles.button_text, {fontSize: dp(24)}]}>
            {profile}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  ));

  return (
    <View style={{alignItems: 'center'}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {buttonlist}
        </View>
      </ScrollView>
    </View>
  );
}

const selectorStyles = StyleSheet.create({
  profileButton: {
    backgroundColor: palette.violet,
    margin: dp(10),
    height: dp(140),
    width: dp(140),
    padding: dp(10),
    borderRadius: dp(10),
  },
});

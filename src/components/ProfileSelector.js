import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useForm, Controller} from 'react-hook-form';
import {ProfileListContext} from '../../global';


import {setActiveProfile} from '../_helpers/storage';
import Input from '../components/Input';
import Button from '../components/Button';

import {styles, palette} from '../styles/styles';

/**
 * Componente: Selector de perfil
 * @param {*} props
 * @return {JSX.Element}
 */
export function ProfileSelector({...props}) {
  const [hiddenPin, setHiddenPin] = useState(true);
  const [profileList, setProfileList] = useContext(ProfileListContext);

  const [modalVisible, setModalVisible] = useState(false);

  const {handleSubmit, control, formState: {errors}} = useForm();

  const showPass = () => {
    setHiddenPin(!hiddenPin);
  };

  useEffect(() => {
    async() => { 
     const keys = await AsyncStorage.getAllKeys();
     const resultKeys = keys.filter((key) => key != 'active'); 
     setProfileList(resultKeys);
     console.log(keys);
    }
   }, []);

  buttonlist = profileList.map((profile, index) =>
      <View key={index} style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button color={palette.violet} onPress={() => {
          props.selector(profile);
        }} label={profile}/>
      </View>,
    );

  return (
      <ScrollView>
          <>
            {buttonlist}
          </>
      </ScrollView>
  );
}

const formStyles = StyleSheet.create({
  input_container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingRight: 20,
    paddingLeft: 20,
  },
});

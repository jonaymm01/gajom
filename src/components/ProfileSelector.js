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
    <View key={index} style={{justifyContent: 'center'}}>
    <TouchableOpacity style={selectorStyles.profileButton} onPress={() => props.selector(profile)}>
      <View style={styles.button_container}>
        <Text style={[styles.button_text, {fontSize: 24}]}>{profile}</Text>
      </View> 
    </TouchableOpacity>
  </View>,
  );

  return (
    <View style={{alignItems: 'center'}}>
      <ScrollView>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            {buttonlist}
          </View>
      </ScrollView>
    </View>
  );
}

const selectorStyles = StyleSheet.create({
  profileButton: {
    backgroundColor: palette.violet,
    margin: 10,
    height: 140,
    width: 140,
    padding: 10,

  }
});

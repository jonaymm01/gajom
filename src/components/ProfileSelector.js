import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useForm, Controller} from 'react-hook-form';
import {ProfileListContext} from '../../global';


import {setActiveProfile, hasPin} from '../_helpers/storage';
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
  const [pinsBoolArray, setPinsBoolArray] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const {handleSubmit, control, formState: {errors}} = useForm();

  const showPass = () => {
    setHiddenPin(!hiddenPin);
  };
  
  let pinIs = [];

  const pinsBool = async () => {
    pinIs = await Promise.all(profileList.map(async (profile) => await hasPin(profile)));
    return pinIs;
  }

  useEffect(() => {
    pinsBool().then((pins)=>setPinsBoolArray(pins));
  }, [])


  buttonlist = profileList.map((profile, index) =>
    <View key={index} style={{justifyContent: 'center', padding: 5}}>
      <TouchableOpacity style={selectorStyles.profileButton} onPress={() => props.selector(profile)}>
        <View style={[styles.button_container, {flex: 3}]}>
          <Text style={[styles.button_text, {fontSize: 24}]}>{profile}</Text>
        </View> 
        <View style={(pinsBoolArray[index]) ? {flex: 1, paddingTop: 10, alignItems: 'center'} : {} }>
          {(pinsBoolArray[index]) ? <Image source={require('../../assets/lock.png')} tintColor={'white'} resizeMode='contain' style={{maxWidth: 30, maxHeight: 30}}/> : null}
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
    height: 160,
    width: 140,
    padding: 10,
    borderRadius: 15,
  }
});

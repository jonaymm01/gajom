import React, {ReactNode, useState, useEffect} from 'react';
import Button from './Button';
import {Pressable, View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {palette} from '../styles/styles';
import {delTap} from '../_helpers/UserContent';
import {setActive} from '../_helpers/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Método para renderizar lista de botones
 * @return {JSX.Element}
 */
export default function ButtonList({...props}) {
  const [activeUser, loadActive] = useState(0);
  const [shouldRefresh, setRefresh] = useState(false);

  /**
   * Método para forzar la actualización de variables.
   */
  function refreshData() {
    setRefresh(!shouldRefresh);
  }

  /**
   * Hook para recuperar la información del usuario activo.
   */
  useEffect(() => {
    const fetchData = async () => {
      await AsyncStorage.getItem('active')
          .then(loadActive)
          .catch((e) => {});
    };
    fetchData()
        .catch(console.error);
  }, [activeUser, shouldRefresh]);

  const user = JSON.parse(activeUser);

  /**
   * Método para redirigir un TAP en formato JSON al creador de Taps
   * @param {JSON} tap
   */
  const goTap = (tap) => {
    const tapString = JSON.stringify(tap);
    props.navigation.navigate(
        'Tap',
        {tapString},
    );
  };

  /**
   * Método para borrar un TAP
   * @param {string} email
   * @param {string} name
   * @param {JSON} options
   */
  const deleteTap = async (email, name, options) => {
    await delTap(email, name, options);
    const modified = await AsyncStorage.getItem(user.email);
    console.log('Nuevo usuario activo (ButtonList):', modified);
    setActive(JSON.parse(modified));
  };

  let buttonlist = [];
  if (props.removable) {
    buttonlist = props.list.map((tap, index) =>
      <View key={index} style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button color={props.color} onPress={() => {
          goTap(tap);
        }} label={tap.text}/>
        <TouchableOpacity onPress={() => {
          deleteTap(user.email, tap.text, tap.options);
          console.log(user.email);
        }} style={ButtonListStyle.deleteButton}>
          <Image source={require('../../assets/trash_icon.png')} resizeMode='contain' style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>,
    );
  } else {
    buttonlist = props.list.map((tap, index) =>
      <View key={index} style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button color={props.color} onPress={() => {
          goTap(tap);
        }} label={tap.text}/>
      </View>,
    );
  }
  return (
    <>
      {buttonlist}
    </>
  );
}

const ButtonListStyle = StyleSheet.create({
  deleteButton: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
  },
});

import React, {ReactNode, useState, useEffect} from 'react';
import Button from './Button';
import {Pressable, View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {palette} from '../styles/styles';
import {delTap} from '../_helpers/UserContent';
import {setActive} from '../_helpers/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pictogram from './Pictogram';


/**
 * Método para renderizar lista de pictogramas
 * @return {JSX.Element}
 */
export default function PictoList({...props}) {
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

  let pictolist = [];

  pictolist = props.list.map((picto, index) =>
    <Pictogram key={index} img={picto.img} text={picto.text}/>,
  );

  return (
    <>
      {pictolist}
    </>
  );
}

const pictolistStyle = StyleSheet.create({
  deleteButton: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
  },
});

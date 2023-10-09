import React, {ReactNode, useState, useEffect} from 'react';
import Button from './Button';
import {Pressable, View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {palette} from '../styles/styles';
import {delTap} from '../_helpers/ProfileContent';
import {setActive} from '../_helpers/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pictogram from './Pictogram';


/**
 * Método para renderizar lista de pictogramas
 * @return {JSX.Element}
 */
export default function PictoList({...props}) {
  const [activeProfile, loadActive] = useState(0);
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
  }, [activeProfile, shouldRefresh]);

  const profile = JSON.parse(activeProfile);

  let pictolist = [];

  function compare(a,b) {
    if (a.name < b.name)
       return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  // const sortedList = props.list.sort((a, b) => compare(a, b));

  pictolist = props.list.map((picto, index) =>
    <Pictogram key={index} data={picto} setPressed={props.setPressed}/>,
  );


  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
      {pictolist}
    </View>
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

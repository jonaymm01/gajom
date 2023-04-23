import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {palette, styles} from '../../styles/styles';
import Button from '../../components/Button';
import ButtonList from '../../components/ButtonList';
import {ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import {setTap} from '../../_helpers/UserContent';
import {setActive} from '../../_helpers/storage';
import TapList from '../../components/TapList';
import {data} from '../../content/DefaultTaps.json';
import LineSeparator from '../../components/LineSeparator';

/**
 * Método para renderizar página de Taps.
 * @return {JSX.Element}
 */
export function Taps() {
  const [activeUser, loadActive] = useState(0);
  const [shouldRefresh, setRefresh] = useState(false);
  const {handleSubmit, control, formState: {errors}, getValues} = useForm();

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
  const defaultTaps = require('../../content/DefaultTaps.json');

  const createTap = async () => {
    const userChange = await setTap(user.email, {
      taps: {
        data: [
          {
            key: 1,
            text: 'a',
          },
          {
            key: 2,
            text: 'b',
          },
          {
            key: 2,
            text: 'ola',
          },
        ],
      },
    });
    const modified = await AsyncStorage.getItem(user.email);
    setActive(JSON.parse(modified));
    console.log(modified);
    refreshData();
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.blank_background}>
        <Text style={[styles.title, {marginTop: 50}]} >Taps de {user.name}</Text>
        <Button color={palette.gray} onPress={() => createTap()} label={'+'}/>
        <View style={{marginTop: 50}}>
          <TapList>{JSON.stringify(user.taps)}</TapList>
          <LineSeparator></LineSeparator>
          <TapList>{JSON.stringify(defaultTaps)}</TapList>
        </View>
      </View>
    </ScrollView>
  );
}

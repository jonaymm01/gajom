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
import Separator from '../../components/Separator';

/**
 * Método para renderizar página de Taps.
 * @return {JSX.Element}
 */
export function TapMenu({navigation}) {
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
            text: '¿Qué hacemos?',
          },
          {
            key: 2,
            text: 'Familia',
          },
          {
            key: 3,
            text: 'Quiniela',
          },
        ],
      },
    });
    const modified = await AsyncStorage.getItem(user.email);
    setActive(JSON.parse(modified));
    console.log(modified);
    refreshData();
  };

  if (activeUser !== '{}') {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.blank_background}>
          <Separator>Taps de {user.name}</Separator>
          <Button color={palette.gray} onPress={() => createTap()} label={'+'}/>
          <ScrollView style={{marginTop: 50}}>
            <TapList navigation={navigation}>{JSON.stringify(user.taps)}</TapList>
            <Separator>Taps de Gajom</Separator>
            <TapList navigation={navigation}>{JSON.stringify(defaultTaps)}</TapList>
          </ScrollView>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.blank_background}>
          <Separator>Taps del usuario</Separator>
          <Text style={[styles.text, {textAlign: 'center'}]}>¡Inicia sesión para crear tus propios TAPs!</Text>
          <ScrollView style={{marginTop: 50}}>
            <Separator>Taps de Gajom</Separator>
            <TapList navigation={navigation}>{JSON.stringify(defaultTaps)}</TapList>
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

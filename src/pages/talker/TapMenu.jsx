import React, {useState, useEffect, useContext} from 'react';
import {Text, View, RefreshControl} from 'react-native';
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

import {UserContext} from '../../../global';


/**
 * Método para renderizar página de Taps.
 * @return {JSX.Element}
 */
export function TapMenu({navigation}) {
  const [user, setUser] = useContext(UserContext);
  const [userTaps, setUserTaps] = useState('');
  const [shouldRefresh, setRefresh] = useState(false);
  const {handleSubmit, control, formState: {errors}, getValues} = useForm();

  const defaultTaps = require('../../content/DefaultTaps.json');

  if ((user !== '{}')) {
    const activeUser = JSON.parse(user);

    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.blank_background}>
          <Separator>Taps de {activeUser.name}</Separator>
          <Button color={palette.gray} onPress={() => navigation.navigate('TapMaker')} label={'+'}/>
          <ScrollView style={{marginTop: 50}}>
            <TapList navigation={navigation} removable={true}>{JSON.stringify(activeUser.taps)}</TapList>
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


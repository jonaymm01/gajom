import React, {useState, useEffect, useContext} from 'react';
import {Text, View, RefreshControl} from 'react-native';
import {palette, styles, dp} from '../../styles/styles';
import Button from '../../components/Button';
import ButtonList from '../../components/ButtonList';
import {ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import {setTap} from '../../_helpers/ProfileContent';
import {setActive} from '../../_helpers/storage';
import TapList from '../../components/TapList';
import {defaultTaps} from '../../content/DefaultTaps.js';
import LineSeparator from '../../components/LineSeparator';
import Separator from '../../components/Separator';

import {ProfileContext} from '../../../global';


/**
 * Método para renderizar página de Taps.
 * @return {JSX.Element}
 */
export function TapMenu({navigation}) {
  const [profile, setProfile] = useContext(ProfileContext);
  const [profileTaps, setProfileTaps] = useState('');
  const [shouldRefresh, setRefresh] = useState(false);
  const {handleSubmit, control, formState: {errors}, getValues} = useForm();


  if ((profile !== '{}')) {
    const activeProfile = JSON.parse(profile);

    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.blank_background}>
            <Separator>TAPs de {activeProfile.name}</Separator>
            <Button color={palette.gray} onPress={() => navigation.navigate('TapMaker')} label={'+'}/>
        </View>
        <View style={{marginTop: dp(50), backgroundColor: '#fff', marginBottom: dp(50)}}>
          <TapList navigation={navigation} removable={true}>{JSON.stringify(activeProfile.taps)}</TapList>
          <Separator>Sugerencias</Separator>
          <TapList navigation={navigation}>{JSON.stringify(defaultTaps)}</TapList>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.blank_background}>
          <Separator>Tus TAPs</Separator>
          <Text style={[styles.text, {textAlign: 'center', marginBottom: dp(10), fontStyle: 'italic'}]}>¡Inicia sesión para crear TAPs!</Text>
          <Button color={palette.gray} onPress={() => navigation.navigate('profile')} label={'Iniciar Sesión'}/>
        </View>
        <View style={{marginTop: dp(50), backgroundColor: '#fff', marginBottom: dp(50)}}>
          <Separator>Sugerencias</Separator>
          <TapList navigation={navigation}>{JSON.stringify(defaultTaps)}</TapList>
        </View>
      </ScrollView>
    );
  }
}


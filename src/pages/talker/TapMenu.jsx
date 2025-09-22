import React, {useState, useEffect, useContext} from 'react';
import {Text, View, RefreshControl, TouchableOpacity} from 'react-native';
import {palette, styles, dp} from '../../styles/styles';
import Button from '../../components/Button';
import ButtonList from '../../components/TapButtonList.js';
import {ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import {setTap} from '../../_helpers/ProfileContent';
import {setActive} from '../../_helpers/storage';
import TapList from '../../components/TapList';
import {defaultTaps} from '../../content/DefaultTaps.js';
import LineSeparator from '../../components/LineSeparator';
import Separator from '../../components/Separator';
import Icon from 'react-native-vector-icons/Ionicons';

import {ProfileContext} from '../../../global';

/**
 * Método para renderizar página de Taps.
 * @return {JSX.Element}
 */
export function TapMenu({navigation}) {
  const [profile, setProfile] = useContext(ProfileContext);
  const [profileTaps, setProfileTaps] = useState('');
  const [shouldRefresh, setRefresh] = useState(false);
  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
  } = useForm();

  if (profile !== '{}') {
    const activeProfile = JSON.parse(profile);

    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.blank_background}>
          <Separator
            textStyle={{
              color: palette.darkViolet,
            }}
            style={{
              alignSelf: 'flex-start',
              marginLeft: dp(25),
            }}
            label={`TAPs de ${activeProfile.name}`}
          />
          <TouchableOpacity
            style={{
              marginTop: dp(5),
              marginBottom: dp(-10),
              width: '88%',
              justifyContent: 'center',
              alignItems: 'center',
              height: dp(75),
              borderColor: palette.darkViolet,
              borderRadius: dp(5),
              backgroundColor: palette.darkViolet,
            }}
            onPress={() => navigation.navigate('TapMaker')}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: dp(20),
                paddingRight: dp(25),
              }}>
              <Text
                style={{
                  color: palette.white,
                  fontSize: dp(20),
                }}>
                Crear un TAP
              </Text>
              <Icon name="add-circle" size={dp(40)} color={'white'} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: dp(20),
            backgroundColor: '#fff',
            marginBottom: dp(50),
          }}>
          <TapList navigation={navigation} removable={true}>
            {JSON.stringify(activeProfile.taps)}
          </TapList>
          <Separator
            textStyle={{
              color: palette.darkViolet,
            }}
            style={{
              marginTop: dp(50),
              alignSelf: 'flex-start',
              marginLeft: dp(25),
            }}
            label={'Sugerencias de Gajom'}
          />
          <TapList navigation={navigation}>
            {JSON.stringify(defaultTaps)}
          </TapList>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.blank_background}>
          <Text
            style={[
              styles.text,
              {textAlign: 'center', marginBottom: dp(10), fontStyle: 'italic'},
            ]}>
            ¡Inicia sesión para crear TAPs!
          </Text>
          <Button
            color={palette.gray}
            onPress={() => navigation.navigate('profile')}
            label={'Iniciar Sesión'}
          />
        </View>
        <View style={{backgroundColor: '#fff', marginBottom: dp(50)}}>
          <Separator
            textStyle={{
              color: palette.darkViolet,
              fontWeight: 'bold',
            }}
            style={{
              marginTop: dp(50),
              alignSelf: 'flex-start',
              marginLeft: dp(25),
            }}
            label={'Sugerencias'}
          />
          <TapList navigation={navigation}>
            {JSON.stringify(defaultTaps)}
          </TapList>
        </View>
      </ScrollView>
    );
  }
}

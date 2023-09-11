import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';

import {Main} from '../pages/Main';
import {Talker} from '../pages/Talker';
import {Profile} from '../pages/Profile';
import {Contact} from '../pages/support/Contact';
import {FQA} from '../pages/support/FQA';
import {Login} from './Login';
import {SignUp} from './Signup';
import {Pictos} from '../pages/talker/Pictos';
import {Questions} from '../pages/talker/Questions';
import {TapMenu} from '../pages/talker/TapMenu';
import {Tap} from '../pages/talker/Tap';
import {TapMaker} from '../pages/talker/TapMaker';

import {ProfileContext} from '../../global';
import {palette} from '../styles/styles';
import { ScreenStackHeaderLeftView } from 'react-native-screens';

const Stack = createStackNavigator();

const MainStackNavigator = ({route}) => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerTintColor: '#fff',
      headerStyle: headerStyle.header,
      headerTitleStyle: headerStyle.title,
      title: 'Volver a Inicio',
    }} initialRouteName='Inicio'>
      <Stack.Screen name="Inicio" component={Main} />
      <Stack.Screen name="FQA" component={FQA} options={{headerShown: true}} />
      <Stack.Screen name="Contact" component={Contact} options={{headerShown: true}} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  const [activeProfile, setProfile] = useContext(ProfileContext);
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerTintColor: '#fff',
      headerStyle: headerStyle.header,
      headerTitleStyle: headerStyle.title,
    }}>
      { (activeProfile == '{}') ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} options={{title: 'Inicio de sesión'}} />
            <Stack.Screen name="Signup" component={SignUp} options={{title: 'Registro'}} />
          </Stack.Group>
      ) : ( 
        <Stack.Group> 
          <Stack.Screen name="Profile" component={Profile} options={{title: 'Perfil'}} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

const TalkerStackNavigator = () => {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      headerTintColor: '#fff',
      headerStyle: headerStyle.header,
      headerTitleStyle: headerStyle.title,
      title: 'Volver al Menú ',
    }}>
      <Stack.Screen name="Talker" component={Talker} />
      <Stack.Screen name="Pictos" component={Pictos} options={{headerShown: true}} />
      <Stack.Screen name="TapMenu" component={TapMenu} options={{headerShown: true}} />
      <Stack.Screen name="Tap" component={Tap} options={{title: 'Volver a menú de TAPs',
        headerShown: true,
        headerStyle: headerStyle.headerWhite,
        headerTintColor: '#000',
        headerTitleStyle: headerStyle.titleBlack,
      }}/>
      <Stack.Screen name="TapMaker" component={TapMaker} />
      <Stack.Screen name="Questions" component={Questions} options={{headerShown: true}} />
    </Stack.Navigator>
  );
};


export {MainStackNavigator, ProfileStackNavigator, TalkerStackNavigator};


const headerStyle = StyleSheet.create({
  header: {
    backgroundColor: palette.gray,
    borderBottomColor: '#ffffff',
    borderBottomWidth: 3,
    height: 60,
  },
  headerWhite: {
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 5,
    height: 60,
  },
  title: {
    color: '#fff',
    fontSize: 23,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
    marginRight: 10,
  },
  titleBlack: {
    color: '#000',
    fontSize: 23,
    marginRight: 10,
  },
});

import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';

import {Info} from '../pages/Info';
import {Talker} from '../pages/Talker';
import {Profile} from '../pages/Profile';
import {FQA} from '../pages/support/FQA';
import {Login} from './Login';
import {SignUp} from './Signup';
import {Pictos} from '../pages/talker/Pictos';
import {Questions} from '../pages/talker/Questions';
import {TapMenu} from '../pages/talker/TapMenu';
import {Tap} from '../pages/talker/Tap';
import {TapMaker} from '../pages/talker/TapMaker';
import { QuestionEnd } from '../pages/talker/QuestionEnd';

import { DictaNumbers } from '../pages/talker/DictaNumbers';
import { DictaText } from '../pages/talker/DictaText';
import { DictaLetters } from '../pages/talker/DictaLetters';
import { DictaMenu } from '../pages/talker/DictaMenu';

import {ProfileContext} from '../../global';
import {palette, dp} from '../styles/styles';
import { ScreenStackHeaderLeftView } from 'react-native-screens';

const Stack = createStackNavigator();

const InfoStackNavigator = ({route}) => {
  return (
    <Stack.Navigator initialRouteName='Inicio' screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Inicio" component={Info} />
      <Stack.Screen name="FQA" component={FQA} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  const [activeProfile, setProfile] = useContext(ProfileContext);
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      { (activeProfile == '{}') ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUp} />
          </Stack.Group>
      ) : ( 
        <Stack.Group> 
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

const TalkerStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Talker" component={Talker} />
      <Stack.Screen name="Pictos" component={Pictos} />
      <Stack.Screen name="TapMenu" component={TapMenu} />
      <Stack.Screen name="Tap" component={Tap} />
      <Stack.Screen name="TapMaker" component={TapMaker} />
      <Stack.Group> 
        <Stack.Screen name="Questions" component={Questions}/>
        <Stack.Screen name="QuestionEnd" component={QuestionEnd}/>
      </Stack.Group>
      <Stack.Group> 
        <Stack.Screen name="DictaMenu" component={DictaMenu}/>
        <Stack.Screen name="DictaNumbers" component={DictaNumbers}/>
        <Stack.Screen name="DictaLetters" component={DictaLetters}/>
        <Stack.Screen name="DictaText" component={DictaText}/>
      </Stack.Group>

    </Stack.Navigator>
  );
};


export {TalkerStackNavigator, ProfileStackNavigator, InfoStackNavigator};


const headerStyle = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    height: dp(60),
    borderBottomWidth: dp(7),
    borderColor: palette.red
  },
  headerWhite: {
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: dp(5),
    height: dp(60),
  },
  title: {
    color: palette.red,
    fontSize: dp(23),
    fontWeight: 'bold'
  },
  titleBlack: {
    color: '#000',
    fontSize: dp(23),
    marginRight: dp(10),
  },
});

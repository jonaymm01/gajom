import React, {useState, useContext} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {InfoStackNavigator, TalkerStackNavigator, ProfileStackNavigator} from './StackNavigator';

import {palette} from '../styles/styles';
import {ProfileContext} from '../../global';

const {width, height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [activeRoute, setRoute] = useState('');
  const [activeProfile, setProfile] = useContext(ProfileContext);
  let profile = '{}';
  if (activeProfile !== '{}') {
    profile = JSON.parse(activeProfile);
  }

  return (
    <View style={{
      width,
      height,
    }}>
      <Tab.Navigator initialRouteName={'talker'}
        screenOptions={({route}) => ({
          safeAreaInsets: {
            bottom: 0,
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'talker') {
              iconName = focused ?
            'ios-chatbubbles' :
            'ios-chatbubbles-outline';
            } else if (route.name === 'info') {
              iconName = focused ?
            'ios-information-circle' :
            'ios-information-circle-outline';
            } else if (route.name === 'profile') {
              iconName = focused ?
            'ios-person' :
            'ios-person-outline';
            }

            return <Ionicons name={iconName} size={30} color={color} />;
          },
          tabBarInactiveTintColor: palette.red,
          tabBarActiveTintColor: 'white',
          tabBarInactiveBackgroundColor: 'white',
          tabBarActiveBackgroundColor: palette.red,
          tabBarStyle: {
            height: 120,
            labelSize: 60,
          },
          tabBarLabelStyle: {
            fontSize: 20,
            height: 50,
          },
        })}
      >
        <Tab.Screen name="profile" component={ProfileStackNavigator} options={{title: 'Perfiles', headerTitle: (profile === '{}') ? 'Ninguna sesión iniciada' : `Sesión de ${profile.name}`, headerStyle: {backgroundColor: palette.red},
          headerTitleStyle: {color: 'white', fontWeight: 'bold'}, headerTitleAlign: 'center'}}/>
        <Tab.Screen name="talker" component={TalkerStackNavigator} options={{title: 'Gajom', headerTitle: (profile === '{}') ? 'Ninguna sesión iniciada' : `Sesión de ${profile.name}`, headerStyle: {backgroundColor: palette.red},
          headerTitleStyle: {color: 'white', fontWeight: 'bold'}, headerTitleAlign: 'center'}}/>
        <Tab.Screen name="info" component={InfoStackNavigator} options={{title: 'Info', headerTitle: (profile === '{}') ? 'Ninguna sesión iniciada' : `Sesión de ${profile.name}`, headerStyle: {backgroundColor: palette.red},
          headerTitleStyle: {color: 'white', fontWeight: 'bold'}, headerTitleAlign: 'center'}}/>
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;

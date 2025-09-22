import React, {useState, useContext} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  InfoStackNavigator,
  TalkerStackNavigator,
  ProfileStackNavigator,
} from './StackNavigator';

import {palette, dp} from '../styles/styles';
import {ProfileContext} from '../../global';

const {width, height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [activeProfile, setProfile] = useContext(ProfileContext);
  let profile = '{}';
  if (activeProfile !== '{}') {
    profile = JSON.parse(activeProfile);
  }

  return (
    <View style={{width, height}}>
      <Tab.Navigator
        initialRouteName={'talker'}
        screenOptions={({route}) => ({
          safeAreaInsets: {
            bottom: 0,
          },

          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'talker') {
              iconName = 'volume-medium';
            } else if (route.name === 'info') {
              iconName = 'information-circle';
            } else if (route.name === 'profile') {
              iconName = 'person-circle';
            }

            return (
              <Ionicons
                name={iconName}
                size={dp(30)}
                style={{height: dp(30), width: dp(30)}}
                color={color}
              />
            );
          },
          tabBarInactiveTintColor: palette.darkViolet,
          tabBarActiveTintColor: 'white',
          tabBarInactiveBackgroundColor: 'white',
          tabBarActiveBackgroundColor: palette.darkViolet,
          tabBarStyle: {
            height: dp(80),
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        })}>
        <Tab.Screen
          name="profile"
          component={ProfileStackNavigator}
          options={{
            title: 'Perfiles',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="talker"
          component={TalkerStackNavigator}
          options={{
            title: 'Gajom',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="info"
          component={InfoStackNavigator}
          options={{
            title: 'Info',
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;

import React, {useState, useContext} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {MainStackNavigator, TalkerStackNavigator, UserStackNavigator} from './StackNavigator';

import {palette} from '../styles/styles';
import {UserContext} from '../../global';

const {width, height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [activeRoute, setRoute] = useState('');
  const [activeUser, setUser] = useContext(UserContext);
  let user = '{}';
  if (activeUser !== '{}') {
    user = JSON.parse(activeUser);
  }

  return (
    <View style={{
      width,
      height,
    }}>
      <Tab.Navigator initialRouteName={'main'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'support') {
              iconName = focused ?
            'help-circle' :
            'ios-help-circle-outline';
            } else if (route.name === 'talker') {
              iconName = focused ?
            'ios-chatbubbles' :
            'ios-chatbubbles-outline';
            } else if (route.name === 'main') {
              iconName = focused ?
            'ios-star' :
            'ios-star-outline';
            } else if (route.name === 'games') {
              iconName = focused ?
            'ios-game-controller' :
            'ios-game-controller-outline';
            } else if (route.name === 'user') {
              iconName = focused ?
            'ios-person' :
            'ios-person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
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
        <Tab.Screen name="talker" component={TalkerStackNavigator} options={{title: 'Hablar', headerTitle: (user === '{}') ? 'Ninguna sesión iniciada' : `Sesión de ${user.name}`, headerStyle: {backgroundColor: palette.red},
          headerTitleStyle: {color: 'white', fontWeight: 'bold'}, headerTitleAlign: 'center'}}/>
        <Tab.Screen name="main" component={MainStackNavigator} options={{title: 'Inicio', headerTitle: (user === '{}') ? 'Ninguna sesión iniciada' : `Sesión de ${user.name}`, headerStyle: {backgroundColor: palette.red},
          headerTitleStyle: {color: 'white', fontWeight: 'bold'}, headerTitleAlign: 'center'}}/>
        <Tab.Screen name="user" component={UserStackNavigator} options={{title: 'Usuario', headerTitle: (user === '{}') ? 'Ninguna sesión iniciada' : `Sesión de ${user.name}`, headerStyle: {backgroundColor: palette.red},
          headerTitleStyle: {color: 'white', fontWeight: 'bold'}, headerTitleAlign: 'center'}}/>
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;

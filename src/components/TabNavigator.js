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
  console.log(typeof(activeUser));
  console.log('TabNavigator.js: ', activeUser);
  if (activeUser !== '{}') {
    user = JSON.parse(activeUser);
  }

  return (
    <View style={{
      width,
      height,
    }}>
      <Tab.Navigator
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
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarActiveBackgroundColor: '#763CAD',
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
        <Tab.Screen name="talker" component={TalkerStackNavigator} options={{title: 'Hablar', headerTitle: 'Gajom', headerStyle: {backgroundColor: palette.violet},
          headerTitleStyle: {color: 'white', fontWeight: 'bold'}}}/>
        <Tab.Screen name="main" component={MainStackNavigator} options={{title: 'Inicio', headerTitle: 'Gajom', headerStyle: {backgroundColor: palette.violet},
          headerTitleStyle: {color: 'white', fontWeight: 'bold'}}}/>
        <Tab.Screen name="user" component={UserStackNavigator} options={{title: 'Usuario', headerTitle: 'Gajom', headerStyle: {backgroundColor: palette.violet},
          headerTitleStyle: {color: 'white', fontWeight: 'bold'}}}/>
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;

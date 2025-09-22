import React, {act, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Alert,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';

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
import {QuestionEnd} from '../pages/talker/QuestionEnd';

import {DictaNumbers} from '../pages/talker/DictaNumbers';
import {DictaText} from '../pages/talker/DictaText';
import {DictaLetters} from '../pages/talker/DictaLetters';
import {DictaMenu} from '../pages/talker/DictaMenu';

import {ProfileContext} from '../../global';
import {palette, dp} from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

const backHomeButton = action => (
  <TouchableOpacity onPress={action}>
    <Icon
      name="arrow-back"
      size={30}
      style={{marginLeft: 20}}
      color={palette.gray}
    />
  </TouchableOpacity>
);

const InfoStackNavigator = ({route}) => {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {activeProfile == '{}' ? (
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
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="Talker"
        component={Talker}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pictos"
        component={Pictos}
        options={{
          headerTitle: '',
          headerLeft: ({onPress}) => backHomeButton(onPress),
        }}
      />
      <Stack.Screen
        name="TapMenu"
        component={TapMenu}
        options={{
          headerTitle: '',
          headerLeft: ({onPress}) => backHomeButton(onPress),
        }}
      />
      <Stack.Screen
        name="Tap"
        component={Tap}
        options={{
          headerTitle: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.navigate('TapMenu')}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Icon name="arrow-back" size={25} color={palette.gray} />
                <Text
                  style={{
                    color: palette.gray,
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  {'Terminar la conversación'}
                </Text>
              </View>
            </TouchableOpacity>
          ),
          headerStyle: {height: dp(50)},
          headerTitleContainerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          },
          headerLeft: () => null,
        }}
      />
      <Stack.Screen name="TapMaker" component={TapMaker} />
      <Stack.Group>
        <Stack.Screen
          name="Questions"
          component={Questions}
          options={{
            headerTitle: '',
            headerLeft: ({onPress}) => backHomeButton(onPress),
          }}
        />
        <Stack.Screen
          name="QuestionEnd"
          component={QuestionEnd}
          options={{
            headerTitle: '',
            headerLeft: ({onPress}) => backHomeButton(onPress),
            cardStyleInterpolator: ({current, layouts}) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0], // Desde fuera de la pantalla hasta su posición
                    }),
                  },
                ],
              },
            }),
          }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="DictaMenu"
          component={DictaMenu}
          options={{
            headerTitle: '',
            headerLeft: ({onPress}) => backHomeButton(onPress),
          }}
        />
        <Stack.Screen
          name="DictaNumbers"
          component={DictaNumbers}
          options={{
            headerTitle: '',
            headerLeft: ({onPress}) => backHomeButton(onPress),
          }}
        />
        <Stack.Screen
          name="DictaLetters"
          component={DictaLetters}
          options={{
            headerTitle: '',
            headerLeft: ({onPress}) => backHomeButton(onPress),
          }}
        />
        <Stack.Screen
          name="DictaText"
          component={DictaText}
          options={{
            headerTitle: '',
            headerLeft: ({onPress}) => backHomeButton(onPress),
          }}
        />
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
    borderColor: palette.red,
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
    fontWeight: 'bold',
  },
  titleBlack: {
    color: '#000',
    fontSize: dp(23),
    marginRight: dp(10),
  },
});

import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Main} from '../pages/Main';
import {Support} from '../pages/Support';
import {Talker} from '../pages/Talker';
import {User} from '../pages/User';
import {Contact} from '../pages/support/Contact';
import {FQA} from '../pages/support/FQA';
import {Login} from './Login';
import {SignUp} from './Signup';
import {Pictos} from '../pages/talker/Pictos';
import {Questions} from '../pages/talker/Questions';
import {TapMenu} from '../pages/talker/TapMenu';
import {Tap} from '../pages/talker/Tap';
import {TapMaker} from '../pages/talker/TapMaker';

import {UserContext} from '../../global';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Inicio" component={Main} />
      <Stack.Screen name="Soporte" component={Support} />
      <Stack.Screen name="FQA" component={FQA} options={{title: 'Preguntas Frecuentes'}} />
      <Stack.Screen name="Contact" component={Contact} options={{title: 'Contactos'}} />
    </Stack.Navigator>
  );
};

const UserStackNavigator = () => {
  const [activeUser, setUser] = useContext(UserContext);
  if (activeUser == '{}') {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Login" component={Login} options={{title: 'Inicio de sesión'}} />
        <Stack.Screen name="Signup" component={SignUp} options={{title: 'Registro'}} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="User" component={User} options={{title: 'Perfil'}} />

      </Stack.Navigator>
    );
  };
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
      <Stack.Screen name="Questions" component={Questions} />
    </Stack.Navigator>
  );
};


export {MainStackNavigator, UserStackNavigator, TalkerStackNavigator};

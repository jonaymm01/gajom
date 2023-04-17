import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Games } from "../pages/Games";
import { Main } from "../pages/Main";
import { Support } from "../pages/Support";
import { Talker } from "../pages/Talker";
import { User } from "../pages/User";
import { Contact } from "../pages/support/Contact";
import { FQA } from "../pages/support/FQA";
import { Login } from "./Login";
import { SignUp } from "./Signup";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator   screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Inicio" component={Main} />
      <Stack.Screen name="Soporte" component={Support} />
        <Stack.Screen name="FQA" component={FQA} options={{ title: 'Preguntas Frecuentes' }} />
        <Stack.Screen name="Contact" component={Contact} options={{ title: 'Contactos' }} />
      <Stack.Screen name="Signup" component={SignUp} options={{ title: 'Registro' }} />
      <Stack.Screen name="Login" component={Login} options={{ title: 'Inicio de sesión' }} />
      <Stack.Screen name="User" component={User} options={{ title: 'Perfil' }} />
    </Stack.Navigator>
  );
}

const GamesStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Games" component={Games} />
        </Stack.Navigator>
    );
}

const TalkerStackNavigator = () => {
    return (
      <Stack.Navigator   screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Talker" component={Talker} />
        </Stack.Navigator>
    );
}


export { MainStackNavigator, GamesStackNavigator, TalkerStackNavigator };
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Games } from "../pages/Games";
import { Main } from "../pages/Main";
import { Support } from "../pages/Support";
import { Talker } from "../pages/Talker";
import { User } from "../pages/User";
import { Contact } from "../pages/support/Contact";
import { FQA } from "../pages/support/FQA";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Main} />
      <Stack.Screen name="Soporte" component={Support} />
        <Stack.Screen name="FQA" component={FQA} options={{ title: 'Preguntas Frecuentes' }} />
        <Stack.Screen name="Contact" component={Contact} options={{ title: 'Contactos' }} />
      <Stack.Screen name="Mi perfil" component={User} />
    </Stack.Navigator>
  );
}

const GamesStackNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Games" component={Games} />
        </Stack.Navigator>
    );
}

const TalkerStackNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Talker" component={Talker} />
        </Stack.Navigator>
    );
}


export { MainStackNavigator, GamesStackNavigator, TalkerStackNavigator };
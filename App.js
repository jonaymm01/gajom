import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Settings } from './components/basics/Settings';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function ContactScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Llamadita!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent='true'>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'preguntas') {
              iconName = focused
                ? 'help-circle'
                : 'ios-help-circle-outline';
            } else if (route.name === 'ajustes') {
              iconName = focused 
                ? 'settings' 
                : 'ios-settings-outline';
            } else if (route.name === 'contacto') {
              iconName = focused 
                ? 'call' 
                : 'ios-call-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarActiveBackgroundColor: 'darkviolet'
        })}
      >
        <Tab.Screen name="preguntas" component={Settings} options={{ title: '¿Alguna duda?', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet', },
  headerTitleStyle: { color: 'white', fontWeight: 'bold'}}} />
        <Tab.Screen name="ajustes" component={Settings} options={{ title: 'Configuración', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet' },
  headerTitleStyle: { color: 'white', fontWeight: 'bold'}}}/>
        <Tab.Screen name="contacto" component={Settings} options={{ title: 'Contáctanos', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet'},
  headerTitleStyle: { color: 'white', fontWeight: 'bold'}}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

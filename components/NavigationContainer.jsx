import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Settings } from './basics/Settings';


const Tab = createBottomTabNavigator();

export function Navigation() {
    return (
        <NavigationContainer independent='true'>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
        
              if (route.name === 'support') {
                iconName = focused
                  ? 'help-circle'
                  : 'ios-help-circle-outline';
              } else if (route.name === 'talker') {
                iconName = focused 
                  ? 'ios-chatbubbles' 
                  : 'ios-chatbubbles-outline';
              } else if (route.name === 'main') {
                iconName = focused 
                  ? 'ios-star' 
                  : 'ios-star-outline';
              } else if (route.name === 'games') {
                iconName = focused 
                  ? 'ios-game-controller' 
                  : 'ios-game-controller-outline';
              } else if (route.name === 'user') {
                iconName = focused 
                  ? 'ios-person' 
                  : 'ios-person-outline';
              }
        
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarActiveBackgroundColor: 'darkviolet'
          })}
        >
          <Tab.Screen name="support" component={Settings} options={{ title: 'Soporte', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet', },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'}}} />
          <Tab.Screen name="talker" component={Settings} options={{ title: 'Comunicador', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'}}}/>
              <Tab.Screen name="main" component={Settings} options={{ title: 'Gajom', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'}}}/>
            <Tab.Screen name="games" component={Settings} options={{ title: 'Juegos', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'}}}/>
          <Tab.Screen name="user" component={Settings} options={{ title: 'Perfil', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet'},
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
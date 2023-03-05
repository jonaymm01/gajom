import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Support } from '../pages/Support';
import { Talker } from '../pages/Talker';
import { Main } from '../pages/Main';
import { Games } from '../pages/Games';
import { User } from '../pages/User';


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
            tabBarActiveBackgroundColor: 'darkviolet',
            tabBarStyle: { 
                height: 120,
                labelSize: 60
            },
            tabBarLabelStyle: {
                fontSize: 20,
                height: 50
              },
            
          })}
        >
          <Tab.Screen name="support" component={Support} options={{ title: 'Soporte', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet', },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'}}} />
          <Tab.Screen name="talker" component={Talker} options={{ title: 'Hablar', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'}}}/>
              <Tab.Screen name="main" component={Main} options={{ title: 'Gajom', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'}}}/>
            <Tab.Screen name="games" component={Games} options={{ title: 'Jugar', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold'}}}/>
          <Tab.Screen name="user" component={User} options={{ title: 'Perfil', headerTitle: 'Gajom', headerStyle: { backgroundColor: 'darkviolet'},
        headerTitleStyle: { color: 'white', fontWeight: 'bold'}}}/>
        </Tab.Navigator>
        </NavigationContainer>
    );
}

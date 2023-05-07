import React, {useEffect, useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './src/components/TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from './global';
import {setActive} from './src/_helpers/storage';

const App = () => {
  const [user, setUser] = useState('{}');

  /**
   * Hook para recuperar la información del usuario activo.
   */
  useEffect(() => {
    const fetchData = async () => {
      console.log(typeof(user));
      await setActive(user).then((pass) => {
        if (pass?.pass) {
          setUser(pass.user);
        };
      },
      );
    };
    fetchData()
        .catch(console.error);
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </UserContext.Provider>
  );
};
export default App;

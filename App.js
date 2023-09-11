import React, {useEffect, useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './src/components/TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileContext} from './global';
import {setActiveProfile} from './src/_helpers/storage';

const App = () => {
  const [profile, setProfile] = useState('{}');

  /**
   * Hook para recuperar la información del usuario activo.
   */
  useEffect(() => {
    const fetchData = async () => {
      await AsyncStorage.getItem('active')
          .then((profile) => {
            console.log('el perfil activo es:', profile);
            setActiveProfile(profile).then((pass) => {
              if (pass?.pass) {
                setProfile(pass.profile);
              };
            },
            );
          });
    };
    fetchData()
        .catch(console.error);
  }, []);

  return (
    <ProfileContext.Provider value={[profile, setProfile]}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </ProfileContext.Provider>
  );
};
export default App;

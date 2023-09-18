import React, {useEffect, useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './src/components/TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileContext} from './global';
import {ProfileListContext} from './global';
import {getAllProfiles, setActiveProfile} from './src/_helpers/storage';

const App = () => {
  const [profileList, setProfileList] = useState([]);
  const [profile, setProfile] = useState('{}');

  /**
   * Hook para recuperar la información del usuario activo.
   */
  useEffect(() => {
    const fetchData = async () => {
      const names = await getAllProfiles();
      setProfileList(names);
      console.log("Usuarios disponibles: ", names);
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
    <ProfileListContext.Provider value={[profileList, setProfileList]}>
    <ProfileContext.Provider value={[profile, setProfile]}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </ProfileContext.Provider>
    </ProfileListContext.Provider>

  );
};
export default App;

import {Text, View} from 'react-native';
import {styles} from '../../styles/styles';
import TapRender from '../../components/Tap';
import {useEffect} from 'react';

/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function Tap({route, navigation}) {
  useEffect(() => {
    navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
    return () => {
      navigation.getParent().setOptions({tabBarStyle: {display: 'flex'}});
    };
  }, [navigation]);
  return (
    <>
      <TapRender>{route.params.tapString}</TapRender>
    </>
  );
}

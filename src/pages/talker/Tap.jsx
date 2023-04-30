import {Text, View} from 'react-native';
import {styles} from '../../styles/styles';
import TapRender from '../../components/Tap';

/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function Tap({route, navigation}) {
  return (
    <>
      <TapRender>{route.params.tapString}</TapRender>
    </>
  );
}

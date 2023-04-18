import {Text, View} from 'react-native';
import {styles} from '../styles/styles';

/**
 * Método para renderizar la página del Comunicador.
 * @return {JSX.Element}
 */
export function Talker() {
  return (
    <View style={styles.blank_background}>
      <Text>Menú de Comunicador</Text>
    </View>
  );
}

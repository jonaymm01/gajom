import {Text, View} from 'react-native';
import {styles} from '../../styles/styles';
import Button from '../../components/Button';
import ButtonList from '../../components/ButtonList';

/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function Tabs() {
  return (
    <View style={styles.blank_background}>
      <Text>Tabs</Text>
      <ButtonList />
    </View>
  );
}

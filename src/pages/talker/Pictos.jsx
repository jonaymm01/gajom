import {Text, View} from 'react-native';
import {styles} from '../../styles/styles';
import Pictogram from '../../components/Pictogram';


/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function Pictos() {
  const text='Comer';
  const img='../../assets/pictos/comer.png';

  return (
    <View style={styles.blank_background}>
      <Pictogram text={text} img={img}/>
    </View>
  );
}

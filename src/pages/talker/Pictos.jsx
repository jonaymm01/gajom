import {Text, View, ScrollView} from 'react-native';
import {styles} from '../../styles/styles';
import PictoList from '../../components/PictoList';
import {DefaultPictos} from '../../content/DefaultPictos';


/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function Pictos() {
  return (
    <ScrollView>
      <View style={styles.blank_background}>
        <PictoList list={DefaultPictos.data.categories[0].content}/>
      </View>
    </ScrollView>

  );
}

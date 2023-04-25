import {Text, View, TouchableOpacity} from 'react-native';
import {styles, palette} from '../../styles/styles';

/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function TapMaker({route, navigation}) {
  const colorButtons = [
    <TouchableOpacity style={[styles.button, {backgroundColor: 'red', borderEndWidth: 2.5, borderBottomWidth: 2.5}]} onPress={() => {}}/>,
    <TouchableOpacity style={[styles.button, {backgroundColor: 'blue', borderLeftWidth: 2.5, borderBottomWidth: 2.5}]} onPress={() => {}}/>,
    <TouchableOpacity style={[styles.button, {backgroundColor: 'green', borderEndWidth: 2.5, borderBottomWidth: 2.5}]} onPress={() => {}}/>,
    <TouchableOpacity style={[styles.button, {backgroundColor: 'yellow', borderLeftWidth: 2.5, borderBottomWidth: 2.5}]} onPress={() => {}}/>,
  ];
  return (
    <View style={styles.blank_background}>
      <View style={{flex: 6, alignContent: 'center', justifyContent: 'center'}}>
        <Text> Creador de TAPs </Text>
      </View>
      <>
        <View style={[styles.container, {flexDirection: 'row', padding: 0}]}>
          <>
            {colorButtons[0]}
          </>
          <>
            {colorButtons[1]}
          </>
        </View>
      </>
      <>
        <View style={[styles.container, {flexDirection: 'row', padding: 0}]}>
          <>
            {colorButtons[2]}
          </>
          <>
            {colorButtons[3]}
          </>
        </View>
      </>
    </View>
  );
}

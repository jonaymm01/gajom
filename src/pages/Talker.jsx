import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {styles, palette} from '../styles/styles';


/**
 * Método para renderizar la página del Comunicador.
 * @return {JSX.Element}
 */
export function Talker({navigation}) {
  const onPressPictos = () => navigation.navigate('Pictos');
  const onPressTabs = () => navigation.navigate('Tabs');
  const onPressQuestions = () => navigation.navigate('Questions');

  return (
    <>

      <View style={[styles.container, {flexDirection: 'column', padding: 0}]}>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.red}]} onPress={onPressPictos}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}>PICTOGRAMAS</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.red}]} onPress={onPressTabs}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}>TABS</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.red}]} onPress={onPressQuestions}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}>PREGUNTADOR</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const talkerStyles = StyleSheet.create({
  box: {
    alignItems: 'center',
    height: 100,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    textAlign: 'justify',
    color: palette.violet,
    lineHeight: 100,
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
  },
});

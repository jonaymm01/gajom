import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {styles, palette} from '../styles/styles';


/**
 * Método para renderizar la página del Comunicador.
 * @return {JSX.Element}
 */
export function Talker({navigation}) {
  const onPressPictos = () => navigation.navigate('Pictos');
  const onPressTaps = () => navigation.navigate('TapMenu');
  const onPressQuestions = () => navigation.navigate('Questions');

  return (
    <>

      <View style={[styles.container, {flexDirection: 'column', padding: 0}]}>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={onPressPictos}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}> PICTOGRAMAS </Text>
            <Text style={talkerStyles.button_text_small}> IMÁGENES CON SIGNIFICADO </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={onPressTaps}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}> TAPS </Text>
            <Text style={talkerStyles.button_text_small}> HABLA PULSANDO </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={onPressQuestions}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}> PREGUNTADOR </Text>
            <Text style={talkerStyles.button_text_small}> CONSTRUYE UNA PREGUNTA </Text>
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
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
    textShadowColor: 'black',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
    marginTop: 10,
  },
  button_text_small: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    marginTop: 10,
    paddingBottom: 20,
  },
});

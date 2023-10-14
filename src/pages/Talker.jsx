import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {styles, palette, dp} from '../styles/styles';
import { ScrollView } from 'react-native-gesture-handler';


/**
 * Método para renderizar la página del Comunicador.
 * @return {JSX.Element}
 */
export function Talker({navigation}) {
  const onPressPictos = () => navigation.navigate('Pictos');
  const onPressTaps = () => navigation.navigate('TapMenu');
  const onPressQuestions = () => navigation.navigate('Questions');
  const onPressDicta = () => navigation.navigate('DictaMenu');


  return (
      <View style={[styles.container, {flexDirection: 'column', padding: dp(0), backgroundColor: '#fff'}]}>
        <TouchableOpacity style={{backgroundColor: palette.violet, margin: dp(5), borderRadius: dp(20), flex: 1}} onPress={onPressPictos}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}> PICTOS </Text>
            <Text style={talkerStyles.button_text_small}> UTILIZA PICTOGRAMAS </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: palette.violet, margin: dp(5), borderRadius: dp(20), flex: 1}} onPress={onPressTaps}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}> TAPS </Text>
            <Text style={talkerStyles.button_text_small}> ESCOGE ENTRE OPCIONES </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: palette.violet, margin: dp(5), borderRadius: dp(20), flex: 1}} onPress={onPressQuestions}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}> PREGUNTADOR </Text>
            <Text style={talkerStyles.button_text_small}> CONSTRUYE UNA PREGUNTA </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: palette.violet, margin: dp(5), borderRadius: dp(20), flex: 1}} onPress={onPressDicta}>
          <View style={styles.button_container}>
            <Text style={talkerStyles.button_text}> ¡DICTA! </Text>
            <Text style={talkerStyles.button_text_small}> NÚMEROS O PALABRAS </Text>
          </View>
        </TouchableOpacity>
      </View>
  );
}

const talkerStyles = StyleSheet.create({
  box: {
    alignItems: 'center',
    height: dp(100),
    backgroundColor: '#fff',
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: dp(40),
    textShadowColor: 'black',
    textShadowOffset: {width: dp(5), height: dp(5)},
    textShadowRadius: dp(10),
    marginTop: dp(10),
  },
  button_text_small: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: dp(20),
    marginTop: dp(10),
    paddingBottom: dp(20),
  },
});

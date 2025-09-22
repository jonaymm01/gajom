import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {styles, palette, dp} from '../styles/styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

/**
 * Método para renderizar la página del Comunicador.
 * @return {JSX.Element}
 */
export function Talker() {
  const navigation = useNavigation();

  const onPressPictos = () => navigation.navigate('Pictos');
  const onPressTaps = () => navigation.navigate('TapMenu');
  const onPressQuestions = () => navigation.navigate('Questions');
  const onPressDicta = () => navigation.navigate('DictaMenu');

  const talkerMenuButton = ({title, subtitle, onPress, side}) => (
    <TouchableOpacity
      style={[
        {
          backgroundColor: palette.violet,
          margin: dp(2),
          borderRadius: dp(6),
          flex: 1,
        },
      ]}
      onPress={onPress}>
      <View
        style={[
          styles.button_container,
          {
            alignItems: 'flex-start',
            padding: dp(25),
          },
        ]}>
        <Text style={talkerStyles.button_text}>{title.toUpperCase()}</Text>
        <Text style={talkerStyles.button_text_small}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        {flexDirection: 'column', padding: dp(2), backgroundColor: '#fff'},
      ]}>
      {talkerMenuButton({
        title: 'Pictos',
        subtitle: 'Utiliza pictogramas',
        onPress: onPressPictos,
        side: 'left',
      })}
      {talkerMenuButton({
        title: 'Taps',
        subtitle: 'Escoge entre opciones',
        onPress: onPressTaps,
        side: 'right',
      })}
      {talkerMenuButton({
        title: 'Preguntador',
        subtitle: 'Construye una pregunta',
        onPress: onPressQuestions,
        side: 'left',
      })}
      {talkerMenuButton({
        title: '¡Dicta!',
        subtitle: 'Números o palabras',
        onPress: onPressDicta,
        side: 'right',
      })}
    </View>
  );
}

const talkerStyles = StyleSheet.create({
  box: {
    alignItems: 'center',
    height: dp(100),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: -2, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: dp(30),
    marginTop: dp(10),
  },
  button_text_small: {
    color: '#fff',
    fontSize: dp(18),
    marginTop: dp(1),
    paddingBottom: dp(20),
  },
});

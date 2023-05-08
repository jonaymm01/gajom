import {useState, useEffect, useContext} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Pressable, ScrollView, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import {styles, palette} from '../../styles/styles';
import {Controller, set, useForm} from 'react-hook-form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {setTap, getTaps, addTap} from '../../_helpers/UserContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {UserContext} from '../../../global';

/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function TapMaker({route, navigation}) {
  const [activeUser, setUser] = useContext(UserContext);
  const [modalName, setModalName] = useState(false);
  const user = JSON.parse(activeUser);

  const {handleSubmit, control, formState: {errors}, getValues, resetField} = useForm();

  const [opt, setOpt] = useState(1);
  const [opt1Text, setText1] = useState('Opción 1');
  const [opt2Text, setText2] = useState('Opción 2');
  const [opt3Text, setText3] = useState('Opción 3');
  const [opt4Text, setText4] = useState('Opción 4');

  const [opt1Color, setColor1] = useState('blue');
  const [opt2Color, setColor2] = useState('yellow');
  const [opt3Color, setColor3] = useState('red');
  const [opt4Color, setColor4] = useState('green');

  const [arrow, setArrow] = useState(['→', '', '', '']);
  const [arrow2, setArrow2] = useState(['←', '', '', '']);

  const [colorsOff, setColorOff] = useState(['']);
  const [defOpts, setDefOpts] = useState(['']);

  const [tapName, setTapName] = useState('');

  const [showText, setShowText] = useState(true);
  const [showOpt, setShowOpt] = useState(true);

  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowOpt((showOpt) => !showOpt);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const colorButtons = () => {
    const colors = [
      'red', 'blue', 'green', 'yellow',
    ];
    const colorsOn = colors.filter((x) => !colorsOff.includes(x));
    const output = colorsOn.map((color, index) => <TouchableOpacity key={index} style={[styles.button, {backgroundColor: color}]} onPress={() => setColor(color)}/>);
    return output;
  };

  /**
   * Renderiza la flecha que señala la opción
   */
  const arrowRender = () => {
    switch (opt) {
      case 1:
        setArrow(['→', '', '', '']);
        setArrow2(['←', '', '', '']);
        break;
      case 2:
        setArrow(['', '→', '', '']);
        setArrow2(['', '←', '', '']);
        break;
      case 3:
        setArrow(['', '', '→', '']);
        setArrow2(['', '', '←', '']);
        break;
      case 4:
        setArrow(['', '', '', '→']);
        setArrow2(['', '', '', '←']);
        break;
    }
  };

  useEffect(() => {
    arrowRender();
  }, [opt]);

  useEffect(() => {
    setColorOff([opt1Color, opt2Color, opt3Color, opt4Color]);
  }, [opt1Color, opt2Color, opt3Color, opt4Color]);

  useEffect(() => {
    setDefOpts([
      {
        'text': opt1Text,
        'color': opt1Color,
      },
      {
        'text': opt2Text,
        'color': opt2Color,
      },
      {
        'text': opt3Text,
        'color': opt3Color,
      },
      {
        'text': opt4Text,
        'color': opt4Color,
      },
    ]);
  }, [opt1Color, opt2Color, opt3Color, opt4Color, opt1Text, opt2Text, opt3Text, opt4Text]);

  const tapOptions = [
    <TouchableOpacity onPress={() => {
      setOpt(1);
      resetField('opt');
    }}><Text key={1} style={[tapPreview.option, {color: (showOpt && opt == 1) ? null : 'white'}, {backgroundColor: opt1Color, borderWidth: (opt1Color == 'white') ? 2 : 0}]}> {opt1Text} </Text></TouchableOpacity>,
    <TouchableOpacity onPress={() => {
      setOpt(2);
      resetField('opt');
    }}><Text key={2} style={[tapPreview.option, {color: (showOpt && opt == 2) ? null : 'white'}, {backgroundColor: opt2Color, borderWidth: (opt2Color == 'white') ? 2 : 0}]}> {opt2Text} </Text></TouchableOpacity>,
    <TouchableOpacity onPress={() => {
      setOpt(3);
      resetField('opt');
    }}><Text key={3} style={[tapPreview.option, {color: (showOpt && opt == 3) ? null : 'white'}, {backgroundColor: opt3Color, borderWidth: (opt3Color == 'white') ? 2 : 0}]}> {opt3Text} </Text></TouchableOpacity>,
    <TouchableOpacity onPress={() => {
      setOpt(4);
      resetField('opt');
    }}><Text key={4} style={[tapPreview.option, {color: (showOpt && opt == 4) ? null : 'white'}, {backgroundColor: opt4Color, borderWidth: (opt4Color == 'white') ? 2 : 0}]}> {opt4Text} </Text></TouchableOpacity>,
  ];

  const arrows = [
    <Text key={1} style={[tapPreview.arrow, {display: showText ? 'none' : 'flex'}]}> {arrow[0]} </Text>,
    <Text key={2} style={[tapPreview.arrow, {display: showText ? 'none' : 'flex'}]}> {arrow[1]} </Text>,
    <Text key={3} style={[tapPreview.arrow, {display: showText ? 'none' : 'flex'}]}> {arrow[2]} </Text>,
    <Text key={4} style={[tapPreview.arrow, {display: showText ? 'none' : 'flex'}]}> {arrow[3]} </Text>,
  ];

  const arrows2 = [
    <Text key={1} style={[tapPreview.arrow, {display: showText ? 'none' : 'flex'}]}> {arrow2[0]} </Text>,
    <Text key={2} style={[tapPreview.arrow, {display: showText ? 'none' : 'flex'}]}> {arrow2[1]} </Text>,
    <Text key={3} style={[tapPreview.arrow, {display: showText ? 'none' : 'flex'}]}> {arrow2[2]} </Text>,
    <Text key={4} style={[tapPreview.arrow, {display: showText ? 'none' : 'flex'}]}> {arrow2[3]} </Text>,
  ];

  /**
   * Cambiar texto en la opción seleccionada
   * @param {string} text
   */
  function setText(text) {
    switch (opt) {
      case 1:
        setText1(text);
        break;
      case 2:
        setText2(text);
        break;
      case 3:
        setText3(text);
        break;
      case 4:
        setText4(text);
        break;
    }
  }

  /**
   * Cambiar color en la opción seleccionada
   * @param {string} color
   */
  function setColor(color) {
    switch (opt) {
      case 1:
        setColor1(color);
        break;
      case 2:
        setColor2(color);
        break;
      case 3:
        setColor3(color);
        break;
      case 4:
        setColor4(color);
        break;
    }
  }

  /**
   * Guarda el TAP creado
   * @param {JSON} value
   */
  const saveTap = async () => {
    const defOptsFiltered = defOpts.filter((opt) => (opt.text.length > 0 || opt.color.length > 0));
    await addTap(user.email, tapName, defOptsFiltered);
    const modified = await AsyncStorage.getItem(user.email);
    setUser(modified);
    navigation.navigate('TapMenu');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.blank_background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalName}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalName(!modalName);
            }}>
            <View style={modalStyles.centeredView}>
              <View style={modalStyles.modalView}>
                <Text style={[styles.basic_font, {marginBottom: 20, marginTop: 40, color: palette.violet}]}>Nombre del TAP</Text>
                <Controller
                  name="name"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: {value: true, message: 'Escribe tu nombre'},
                  }}
                  render={({field: {onChange, value}}) => (
                    <Input
                      error={errors.name}
                      errorText={errors?.name?.message}
                      onChangeText={(text) => {
                        setTapName(text);
                        onChange(text);
                      }
                      }
                      value={value}
                      placeholder='Nombre'
                    />
                  )}
                />
                <Pressable
                  style={[modalStyles.button, modalStyles.buttonSave, {marginTop: 50}]}
                  onPress={() => {
                    saveTap();
                    setModalName(!modalName);
                  }}
                >
                  <Text style={modalStyles.textStyle}>Guardar TAP</Text>
                </Pressable>
                <Pressable
                  style={[modalStyles.button, modalStyles.buttonClose, {marginTop: 10}]}
                  onPress={() => {
                    setModalName(!modalName);
                  }}
                >
                  <Text style={modalStyles.textStyle}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{alignContent: 'center', justifyContent: 'center'}}>
                <>
                  {tapOptions}
                </>
              </View>
            </View>

            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{alignItems: 'center', marginTop: 20}}>
                <Controller
                  name="opt"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: {value: true, message: 'Escribe una opción'},
                  }}
                  render={({field: {onChange, value}}) => (
                    <Input
                      error={errors.name}
                      errorText={errors?.name?.message}
                      onChangeText={(text) => {
                        setText(text);
                        onChange(text);
                      }}
                      value={value}
                      placeholder={`Escribe aquí la ${opt}ª palabra`}
                    />
                  )}
                />
              </View>
            </View>
          </View>

          <View style={[styles.container, {flexDirection: 'row', flex: 1}]}>
            <>
              {colorButtons()}
            </>
          </View>
          <View style={[styles.container, {flexDirection: 'row', flex: 1}]}>
            <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={() => setColor('white')}>
              <View style={styles.button_container}>
                <Text style={{alignSelf: 'center', color: '#fff', fontWeight: 'bold'}}> Extraer color </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.container, {flexDirection: 'row', flex: 2}]}>
            <TouchableOpacity style={[styles.button, {backgroundColor: palette.gray}]} onPress={() => navigation.navigate('TapMenu')}>
              <View style={styles.button_container}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>DESCARTAR</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={() => setModalName(!modalName)}>
              <View style={styles.button_container}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>TERMINAR</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const tapPreview = StyleSheet.create({
  option: {
    padding: 10,
    borderColor: '#000',
    borderStyle: 'dashed',
    width: 280,
    height: 50,
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 20,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    alignSelf: 'center',
  },
  optionText: {
    color: '#fff',
    textShadowColor: 'black',
  },
  arrow: {
    color: '#000',
    backgroundColor: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 6,
  },
});

const tapMaker = StyleSheet.create({
  nextButton: {
    backgroundColor: palette.violet,
    color: '#fff',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 20,
  },
  backButton: {
    backgroundColor: palette.violet,
    color: '#fff',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 20,
  },
  loadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 30,
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderColor: '#763CAD',
    borderWidth: 10,
    borderRadius: 10,
    padding: 40,
    height: 500,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 10,
    width: 200,
    height: 80,
    elevation: 10,
  },
  buttonSave: {
    backgroundColor: palette.violet,
  },
  buttonClose: {
    backgroundColor: palette.gray,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 80,
    fontSize: 30,
  },
  modalText: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

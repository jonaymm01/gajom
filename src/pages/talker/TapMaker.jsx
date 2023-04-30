import {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Pressable, ScrollView, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import {styles, palette} from '../../styles/styles';
import {Controller, set, useForm} from 'react-hook-form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {setTap, getTaps, addTap} from '../../_helpers/UserContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setActive} from '../../_helpers/storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function TapMaker({route, navigation}) {
  const [activeUser, loadActive] = useState(0);
  const [shouldRefresh, setRefresh] = useState(false);
  const [modalName, setModalName] = useState(false);


  /**
   * Método para forzar la actualización de variables.
   */
  function refreshData() {
    setRefresh(!shouldRefresh);
  }

  /**
   * Hook para recuperar la información del usuario activo.
   */
  useEffect(() => {
    const fetchData = async () => {
      await AsyncStorage.getItem('active')
          .then(loadActive)
          .catch((e) => {});
    };
    fetchData()
        .catch(console.error);
  }, [activeUser, shouldRefresh]);

  const user = JSON.parse(activeUser);

  const {handleSubmit, control, formState: {errors}, getValues, resetField} = useForm();

  const [opt, setOpt] = useState(1);
  const [opt1Text, setText1] = useState('');
  const [opt2Text, setText2] = useState('');
  const [opt3Text, setText3] = useState('');
  const [opt4Text, setText4] = useState('');

  const [opt1Color, setColor1] = useState('blue');
  const [opt2Color, setColor2] = useState('yellow');
  const [opt3Color, setColor3] = useState('red');
  const [opt4Color, setColor4] = useState('green');

  const [arrow, setArrow] = useState(['→', '', '', '']);
  const [arrow2, setArrow2] = useState(['←', '', '', '']);

  const [colorsOff, setColorOff] = useState(['']);
  const [defOpts, setDefOpts] = useState(['']);

  const [tapName, setTapName] = useState('');

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
    <Text style={[tapPreview.option, {backgroundColor: opt1Color}]}> {opt1Text} </Text>,
    <Text style={[tapPreview.option, {backgroundColor: opt2Color}]}> {opt2Text} </Text>,
    <Text style={[tapPreview.option, {backgroundColor: opt3Color}]}> {opt3Text} </Text>,
    <Text style={[tapPreview.option, {backgroundColor: opt4Color}]}> {opt4Text} </Text>,
  ];

  const arrows = [
    <Text style={[tapPreview.arrow]}> {arrow[0]} </Text>,
    <Text style={[tapPreview.arrow]}> {arrow[1]} </Text>,
    <Text style={[tapPreview.arrow]}> {arrow[2]} </Text>,
    <Text style={[tapPreview.arrow]}> {arrow[3]} </Text>,
  ];

  const arrows2 = [
    <Text style={[tapPreview.arrow]}> {arrow2[0]} </Text>,
    <Text style={[tapPreview.arrow]}> {arrow2[1]} </Text>,
    <Text style={[tapPreview.arrow]}> {arrow2[2]} </Text>,
    <Text style={[tapPreview.arrow]}> {arrow2[3]} </Text>,
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
    setActive(JSON.parse(modified));
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

          <View style={{flexDirection: 'row', flex: 6, alignItems: 'center'}}>
            <View style={{alignContent: 'center', justifyContent: 'center'}}>
              <>
                {arrows}
              </>
            </View>
            <View style={{alignContent: 'center', justifyContent: 'center'}}>
              <>
                {tapOptions}
              </>
            </View>
            <View style={{alignContent: 'center', justifyContent: 'center'}}>
              <>
                {arrows2}
              </>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={tapMaker.backButton}
              onPress={() => {
                if (opt > 1) {
                  setOpt(opt-1);
                  resetField('opt');
                }
              }}
            >
              <Text style={tapMaker.loadText}> ← </Text>
            </Pressable>
            <Text style={[styles.title, {margin: 10}]}>Editando Opción {opt}</Text>
            <Pressable
              style={tapMaker.nextButton}
              onPress={() => {
                if (opt < 4) {
                  setOpt(opt+1);
                }
                resetField('opt');
              }}
            >
              <Text style={tapMaker.loadText}> → </Text>
            </Pressable>
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

          <View style={[styles.container, {flexDirection: 'row', flex: 1}]}>
            <>
              {colorButtons()}
            </>
          </View>
          <View style={[styles.container, {flexDirection: 'row', flex: 1}]}>
            <TouchableOpacity style={[styles.button, {backgroundColor: palette.gray}]} onPress={() => setColor('white')}>
              <View style={styles.button_container}>
                <Text style={{alignSelf: 'center', backgroundColor: palette.gray, color: '#fff', fontWeight: 'bold'}}> Extraer color </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.container, {flexDirection: 'row', flex: 2}]}>
            <TouchableOpacity style={[styles.button, {backgroundColor: palette.gray}]} onPress={() => navigation.navigate('TapMenu')}>
              <View style={styles.button_container}>
                <Text style={[styles.button_text, {lineHeight: 70}]}>DESCARTAR</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={() => setModalName(!modalName)}>
              <View style={styles.button_container}>
                <Text style={[styles.button_text, {lineHeight: 70}]}>TERMINAR</Text>
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    padding: 10,
    borderColor: '#000',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  arrow: {
    color: '#000',
    backgroundColor: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
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

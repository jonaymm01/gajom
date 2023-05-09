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
  const [optColor, setOptColor] = useState('blue');
  const [optText, setOptText] = useState('');

  const [opt1Text, setText1] = useState('Opción 1');
  const [opt2Text, setText2] = useState('Opción 2');
  const [opt3Text, setText3] = useState('Opción 3');
  const [opt4Text, setText4] = useState('Opción 4');

  const [opt1Used, markOpt1] = useState(false);
  const [opt2Used, markOpt2] = useState(false);
  const [opt3Used, markOpt3] = useState(false);
  const [opt4Used, markOpt4] = useState(false);
  const [usedOpts, setUsedOpts] = useState([]);


  const [opt1Color, setColor1] = useState('blue');
  const [opt2Color, setColor2] = useState('red');
  const [opt3Color, setColor3] = useState('green');
  const [opt4Color, setColor4] = useState('yellow');

  const [colorsOff, setColorOff] = useState(['']);
  const [defOpts, setDefOpts] = useState(['']);

  const [tapName, setTapName] = useState('');

  const colorButtons = () => {
    const colors = [
      'red', 'blue', 'green', 'yellow',
    ];
    const colorsOn = colors.filter((x) => !colorsOff.includes(x));
    let output = [];
    if (colorsOn.length > 0) {
      output = colorsOn.map((color, index) => <TouchableOpacity key={index} style={[styles.button, {backgroundColor: color}]} onPress={() => setColor(color)}/>);
    } else {
      output = <Text style={{alignSelf: 'center', fontStyle: 'italic'}}>¡Quita el color de una opción y pónselo a otra!</Text>;
    }
    return output;
  };

  const OptsList = [

    <View key={1} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style = {[tapPreview.deleteOption, {marginRight: opt1Used ? 30 : 10}]}
        onPress={() => {
          setColor1('white');
        }}>
        <Text style={[tapPreview.optionText, {fontSize: 30, lineHeight: 30}]}> · </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setOpt(1);
      }}>
        <Text style={[tapPreview.option,
          {
            width: !opt1Used ? 200 : 160,
            backgroundColor: opt1Color,
            borderWidth: (opt1Used || (opt1Color === 'white')) ? 2 : null,
            borderStyle: (opt1Used) ? 'solid' : null,
            borderStyle: (opt1Color === 'white') ? 'dashed' : null,
          },
        ]}> {opt1Text} </Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[tapPreview.deleteOption, {marginLeft: opt1Used ? 30 : 10}]}
        onPress={() => {
          setText1('Opción 1');
          markOpt1(false);
        }}>
        <Text style={[tapPreview.optionText, {fontSize: 30, lineHeight: 30}]}> x </Text>
      </TouchableOpacity>
    </View>,

    <View key={2} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style = {[tapPreview.deleteOption, {marginRight: opt2Used ? 30 : 10}]}
        onPress={() => {
          setColor2('white');
        }}>
        <Text style={[tapPreview.optionText, {fontSize: 30, lineHeight: 30}]}> · </Text>
      </TouchableOpacity>
      <TouchableOpacity key={2} onPress={() => {
        setOpt(2);
      }}>
        <Text style={[tapPreview.option,
          {
            width: !opt2Used ? 200 : 160,
            backgroundColor: opt2Color,
            borderWidth: (opt2Used || (opt2Color === 'white')) ? 2 : null,
            borderStyle: (opt2Used) ? 'solid' : null,
            borderStyle: (opt2Color === 'white') ? 'dashed' : null,
          },
        ]}> {opt2Text} </Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[tapPreview.deleteOption, {marginLeft: opt2Used ? 30 : 10}]}
        onPress={() => {
          setText2('Opción 2');
          markOpt2(false);
        }}>
        <Text style={[tapPreview.optionText, {fontSize: 30, lineHeight: 30}]}> x </Text>
      </TouchableOpacity>
    </View>,

    <View key={3} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style = {[tapPreview.deleteOption, {marginRight: opt3Used ? 30 : 10}]}
        onPress={() => {
          setColor3('white');
        }}>
        <Text style={[tapPreview.optionText, {fontSize: 30, lineHeight: 30}]}> · </Text>
      </TouchableOpacity>
      <TouchableOpacity key={3} onPress={() => {
        setOpt(3);
      }}>
        <Text style={[tapPreview.option,
          {
            width: !opt3Used ? 200 : 160,
            backgroundColor: opt3Color,
            borderWidth: (opt3Used || (opt3Color === 'white')) ? 2 : null,
            borderStyle: (opt3Used) ? 'solid' : null,
            borderStyle: (opt3Color === 'white') ? 'dashed' : null,
          },
        ]}> {opt3Text} </Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[tapPreview.deleteOption, {marginLeft: opt3Used ? 30 : 10}]}
        onPress={() => {
          setText3('Opción 3');
          markOpt3(false);
        }}>
        <Text style={[tapPreview.optionText, {fontSize: 30, lineHeight: 30}]}> x </Text>
      </TouchableOpacity>
    </View>,

    <View key={4} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style = {[tapPreview.deleteOption, {marginRight: opt4Used ? 30 : 10}]}
        onPress={() => {
          setColor4('white');
        }}>
        <Text style={[tapPreview.optionText, {fontSize: 30, lineHeight: 30}]}> · </Text>
      </TouchableOpacity>
      <TouchableOpacity key={4} onPress={() => {
        setOpt(4);
      }}>
        <Text style={[tapPreview.option,
          {
            width: !opt4Used ? 200 : 160,
            backgroundColor: opt4Color,
            borderWidth: (opt4Used || (opt4Color === 'white')) ? 2 : null,
            borderStyle: (opt4Used) ? 'solid' : null,
            borderStyle: (opt4Color === 'white') ? 'dashed' : null,
          },
        ]}> {opt4Text} </Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[tapPreview.deleteOption, {marginLeft: opt4Used ? 30 : 10}]}
        onPress={() => {
          setText4('Opción 4');
          markOpt4(false);
        }}>
        <Text style={[tapPreview.optionText, {fontSize: 30, lineHeight: 30}]}> x </Text>
      </TouchableOpacity>
    </View>,

  ];

  useEffect(() => {
    setColorOff([opt1Color, opt2Color, opt3Color, opt4Color]);
  }, [opt1Color, opt2Color, opt3Color, opt4Color]);

  useEffect(() => {
    setUsedOpts([opt1Used, opt2Used, opt3Used, opt4Used]);
  }, [opt1Used, opt2Used, opt3Used, opt4Used]);

  useEffect(() => {
    resetField('opt');
    switch (opt) {
      case 1:
        setOptColor(opt1Color);
        setOptText(opt1Text);
        break;
      case 2:
        setOptColor(opt2Color);
        setOptText(opt2Text);
        break;
      case 3:
        setOptColor(opt3Color);
        setOptText(opt3Text);
        break;
      case 4:
        setOptColor(opt4Color);
        setOptText(opt4Text);
        break;
    }
  }, [opt]);

  useEffect(() => {
    (opt1Text != 'Opción 1') ? markOpt1(true) : null;
    (opt2Text != 'Opción 2') ? markOpt2(true) : null;
    (opt3Text != 'Opción 3') ? markOpt3(true) : null;
    (opt4Text != 'Opción 4') ? markOpt4(true) : null;
  }, [opt1Text, opt2Text, opt3Text, opt4Text]);

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
 * Cambiar texto en la opción seleccionada
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

  const confirmTap = () => {
    const finalOpts = [
      {
        'text': opt1Used ? opt1Text : null,
        'color': (opt1Used && opt1Color !== 'white') ? opt1Color : null,
      },
      {
        'text': opt2Used ? opt2Text : null,
        'color': (opt2Used && opt2Color !== 'white') ? opt2Color : null,
      },
      {
        'text': opt3Used ? opt3Text : null,
        'color': (opt3Used && opt3Color !== 'white') ? opt3Color : null,
      },
      {
        'text': opt4Used ? opt4Text : null,
        'color': (opt4Used && opt4Color !== 'white') ? opt4Color : null,
      },
    ];
    const filteredOpts = finalOpts.filter((opt) => ((opt.text != null) && opt.color != null));
    setDefOpts(filteredOpts);
    setModalName(!modalName);
  };

  const defOptsFiltered = defOpts.map((opt, index) => <Text key={index} style={[tapPreview.option, {backgroundColor: opt.color},
  ]}> {opt.text} </Text>,
  );

  /**
   * Guarda el TAP creado
   * @param {JSON} value
   */
  const saveTap = async () => {
    const defTap = defOpts.map((opt) => {
      const option = {
        text: opt.text,
        color: opt.color,
      };
      return option;
    });

    await addTap(user.email, tapName, defTap);
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
            <View style={[modalStyles.centeredView, modalStyles.modalView]}>
              <Text style={[styles.title, {marginBottom: 20, color: palette.violet}]}>Este es el resultado:</Text>
              <>
                {defOptsFiltered}
              </>
              <Text style={[styles.title, {marginBottom: 20, marginTop: 40, color: palette.violet}]}>¿Cómo se llamará este TAP?</Text>
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
              <View style={{flexDirection: 'row'}}>
                <Pressable
                  style={[modalStyles.button, modalStyles.grayBackground]}
                  onPress={() => {
                    setModalName(!modalName);
                  }}
                >
                  <Text style={modalStyles.textStyle}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[modalStyles.button, modalStyles.violetBackground]}
                  onPress={() => {
                    saveTap();
                    setModalName(!modalName);
                  }}
                >
                  <Text style={modalStyles.textStyle}>Guardar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{alignContent: 'center', justifyContent: 'center'}}>
                <>
                  {OptsList}
                </>
              </View>
            </View>

            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{alignItems: 'center', marginTop: 20, width: 280}}>
                <Controller
                  name="opt"
                  defaultValue=''
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
                      placeholder={optText}
                    />
                  )}
                />
              </View>
            </View>
          </View>

          <View style={[styles.container, {flexDirection: 'row', flex: 1, borderColor: '#000', borderWidth: 2, width: 350, justifyContent: 'center'}]}>
            <>
              {colorButtons()}
            </>
          </View>

          <View style={[styles.container, {flexDirection: 'row', flex: 2}]}>
            <TouchableOpacity style={[styles.button, {backgroundColor: palette.gray}]} onPress={() => navigation.navigate('TapMenu')}>
              <View style={styles.button_container}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>DESCARTAR</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={() => confirmTap()}>
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
    color: '#fff',
    textShadowColor: 'black',
  },
  deleteOption: {
    backgroundColor: palette.gray,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  extractor: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
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
    borderWidth: 5,
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
    width: 150,
    height: 80,
    elevation: 10,
    margin: 15,
  },
  violetBackground: {
    backgroundColor: palette.violet,
  },
  grayBackground: {
    backgroundColor: palette.gray,
  },
  redBackground: {
    backgroundColor: palette.red,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 80,
    fontSize: 25,
  },
  modalText: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

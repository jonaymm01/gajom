import {useState, useEffect, useContext} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Pressable, ScrollView, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Image, Alert} from 'react-native';
import {styles, palette, tapColors} from '../../styles/styles';
import {Controller, set, useForm} from 'react-hook-form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {setTap, getTaps, addTap, searchTap} from '../../_helpers/ProfileContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {ProfileContext} from '../../../global';

/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function TapMaker({route, navigation}) {
  const [activeProfile, setProfile] = useContext(ProfileContext);
  const [modalVoid, setModalVoid] = useState(false);

  const yellow = tapColors.yellow;
  const red = tapColors.red;
  const blue = tapColors.blue;
  const green = tapColors.green;

  const profile = JSON.parse(activeProfile);

  const {handleSubmit, control, formState: {errors}, getValues, resetField} = useForm();

  const [opt, setOpt] = useState(1);
  const [optColor, setOptColor] = useState(blue);
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


  const [opt1Color, setColor1] = useState(green);
  const [opt2Color, setColor2] = useState(yellow);
  const [opt3Color, setColor3] = useState(red);
  const [opt4Color, setColor4] = useState(blue);

  const [colorsOff, setColorOff] = useState(['']);
  const [defOpts, setDefOpts] = useState(['']);

  const [tapName, setTapName] = useState('');

  const [confirmed, isConfirmed] = useState(false);

  const colorButtons = () => {
    const colors = [
      red, blue, green, yellow,
    ];
    const colorsOn = colors.filter((x) => !colorsOff.includes(x));
    let output = [];
    if (colorsOn.length > 0) {
      output = colorsOn.map((color, index) => <TouchableOpacity key={index} style={[styles.button, {backgroundColor: color}]} onPress={() => setColor(opt, color)}/>);
    } else {
      output = <Text style={{alignSelf: 'center', fontStyle: 'italic'}}>Paleta de colores</Text>;
    }
    return output;
  };

  const getOptColor = (opt) => {
    switch (opt) {
      case 1: return opt1Color;
      case 2: return opt2Color;
      case 3: return opt3Color;
      case 4: return opt4Color;
    }
  };

  const getOptText = (opt) => {
    switch (opt) {
      case 1: return opt1Text;
      case 2: return opt2Text;
      case 3: return opt3Text;
      case 4: return opt4Text;
    }
  };

  const getOptUsed = (opt) => {
    switch (opt) {
      case 1: return opt1Used;
      case 2: return opt2Used;
      case 3: return opt3Used;
      case 4: return opt4Used;
    }
  };

  const markOpt = (opt, state) => {
    switch (opt) {
      case 1: return markOpt1(state);
      case 2: return markOpt2(state);
      case 3: return markOpt3(state);
      case 4: return markOpt4(state);
    }
  };

  const setColor = (opt, color) => {
    switch (opt) {
      case 1: return setColor1(color);
      case 2: return setColor2(color);
      case 3: return setColor3(color);
      case 4: return setColor4(color);
    }
  };

  const setText = (opt, text) => {
    switch (opt) {
      case 1: return setText1(text);
      case 2: return setText2(text);
      case 3: return setText3(text);
      case 4: return setText4(text);
    }
  };

  const optionInput = (index) =>
    <>
      <View style={{display: (opt == index) ? 'flex' : 'none'}}>
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
                setText(opt, text);
                onChange(text);
              }}
              value={value}
              placeholder={optText}
              style={{backgroundColor: 'white', justifyContent: 'center', width: 150, alignSelf: 'center', marginBottom: -20, height: 40, fontSize: 15, textAlign: 'center'}}
            />
          )}
        />
      </View>
      <View style={{display: (opt == index) ? 'none' : 'flex'}}>
        <Text style={[
          tapPreview.optionText,
          {
            color: (opt === index) ? 'black' : 'white',
            fontStyle: !opt1Used ? 'italic' : 'normal',
            textShadowColor: (opt === index) ? null : 'black',
            backgroundColor: ((opt === index) ) ? 'white' : null,
            width: (opt === index) ? 140 : null,
            borderStyle: (getOptColor(index) === 'white') ? 'dashed' : null,
            borderWidth: (getOptUsed(index) && (getOptColor(index) === 'white') && (opt == index)) ? 2 : null,
          },
        ]}> {getOptText(index)} </Text>
      </View>
    </>;

  const OptsList = [];
  for (let index = 1; index <= 4; index++) {
    OptsList.push(<View key={index} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style = {[tapPreview.deleteOption, {marginRight: 10, backgroundColor: getOptColor(index)}]}
        onPress={() => {
          setColor(index, 'white');
        }}>
        <Image source={require('../../../assets/picker_icon.png')} resizeMode='contain' style={{width: 30, height: 30}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setOpt(index);
      }}>
        <View style={[tapPreview.option, {
          width: !getOptUsed(index) ? 200 : 160,
          backgroundColor: getOptColor(index),
          borderWidth: ((getOptColor(index) === 'white')) ? 2 : null,
          borderStyle: (getOptColor(index) === 'white') ? 'dashed' : null,
        }]}>
          <>
            {optionInput(index)}
          </>
        </View>
      </TouchableOpacity>
      <Text style={[tapPreview.optionText, {fontSize: 30, lineHeight: 30, marginLeft: 10, color: getOptColor(index)}]}> {(getOptUsed(index) && (getOptColor(index) !== 'white')) ? '☑' : '☐'} </Text>
    </View>,
    );
  }

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
    (opt1Text === '') ? setText1('Opción 1') : null;
    (opt2Text === '') ? setText2('Opción 2') : null;
    (opt3Text === '') ? setText3('Opción 3') : null;
    (opt4Text === '') ? setText4('Opción 4') : null;

    (opt1Text != 'Opción 1') ? markOpt1(true) : markOpt1(false);
    (opt2Text != 'Opción 2') ? markOpt2(true) : markOpt2(false);
    (opt3Text != 'Opción 3') ? markOpt3(true) : markOpt3(false);
    (opt4Text != 'Opción 4') ? markOpt4(true) : markOpt4(false);
  }, [opt1Text, opt2Text, opt3Text, opt4Text]);

  useEffect(() => {
    switch (opt) {
      case 1:
        setOptColor(opt1Color);
        break;
      case 2:
        setOptColor(opt2Color);
        break;
      case 3:
        setOptColor(opt3Color);
        break;
      case 4:
        setOptColor(opt4Color);
        break;
    };
  }, [opt1Color, opt2Color, opt3Color, opt4Color]);

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
    (filteredOpts.length > 0) ? isConfirmed(true) : Alert.alert('¡Aún no está listo!', 'Tu TAP debe tener al menos una opción configurada.', [
      {text: 'OK'},
    ],
    {
      cancelable: true,
    }); ;
  };

  const defOptsFiltered = defOpts.map((opt, index) => <Text key={index} style={[tapPreview.optionText, tapPreview.option, {backgroundColor: opt.color},
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

    await addTap(profile.name, tapName, defTap);
    const modified = await AsyncStorage.getItem(profile.name);
    setProfile(modified);
    navigation.navigate('TapMenu');
  };

  const pickerIcon = <Image source={require('../../../assets/picker_icon_black.png')} style={{width: 20, height: 20}} />;

  const alreadyExist = async () => {
    const response = await searchTap(profile.name, getValues().name);
    return response;
  }

  if (!confirmed) {
    return (
      <View style={styles.blank_background}>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVoid}
          onRequestClose={() => {
            setModalVoid(!modalVoid);
          }}>
          <View style={modalStyles.modalAlert}>
            <Image source={require('../../../assets/warning.png')} resizeMode='contain' style={{width: 80, height: 80}} />
            <Text style={modalStyles.modalText}>Tu TAP debe tener al menos una opción</Text>
            <Pressable
              style={[modalStyles.button, modalStyles.redBackground]}
              onPress={() => setModalVoid(!modalVoid)}>
              <Text style={modalStyles.textStyle}>¡Entendido!</Text>
            </Pressable>
          </View>
        </Modal>

        <View style={{padding: 20, marginBottom: 25}}>
          <Text style= {{fontSize: 18, fontWeight: 'bold'}}>Pulsa una opción para cambiarla.</Text>
          <Text style= {{fontSize: 16}}>1. Escribe su contenido.</Text>
          <Text style= {{fontSize: 16}}>2. Píntala con cualquier color de la paleta.</Text>
          <Text style= {{fontSize: 16, fontStyle: 'italic'}}>¡Pulsa {pickerIcon} para llevar el color a la paleta!</Text>
        </View>

        <View style={{flex: 5, margin: 30, marginBottom: 70}}>
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{alignContent: 'center', justifyContent: 'center'}}>
                <>
                  {OptsList}
                </>
                <View style={[{flexDirection: 'row', margin: 20, marginBottom: 50}]}>
                  <View style={[tapMaker.colorTable]}>
                    <>
                      {colorButtons()}
                    </>
                  </View>
                </View>
              </View>
            </View>
          </>
        </View>

        <View style={[styles.container, {flexDirection: 'row', flex: 2}]}>
          <TouchableOpacity style={[styles.button, {backgroundColor: palette.gray}]} onPress={() => navigation.navigate('TapMenu')}>
            <View style={styles.button_container}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>❮  DESCARTAR</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={() => confirmTap()}>
            <View style={styles.button_container}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>TERMINAR  ❯</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    );
  } else {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={{backgroundColor: 'white'}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          style={styles.blank_background}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <View style={{marginTop: 40, alignItems: 'center'}}>
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
                    <View style={{width: 300}}>
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
                    </View>
                  )}
                />
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[modalStyles.button, modalStyles.grayBackground]}
                    onPress={() => {
                      isConfirmed(false);
                    }}
                  >
                    <Text style={modalStyles.textStyle}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={[modalStyles.button, modalStyles.violetBackground]}
                    onPress={() => {
                      if (getValues().name.length > 0) {
                        alreadyExist().then((isDuplicate) => 
                        {
                          if(!isDuplicate) {
                            saveTap();
                          } else {
                            Alert.alert('¡Ups!', 'Ya tienes un TAP con este nombre.', [
                              {text: 'OK'},
                            ],
                            {
                              cancelable: true,
                            });
                          }
                        });
                      } else {
                        Alert.alert('¡Espera!', 'Aún no has introducido un nombre.', [
                          {text: 'OK'},
                        ],
                        {
                          cancelable: true,
                        });
                      }
                    }}
                  >
                    <Text style={modalStyles.textStyle}>Guardar</Text>
                  </Pressable>
                </View>
              </View>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const tapPreview = StyleSheet.create({
  option: {
    width: 280,
    height: 50,
    color: '#fff',
    textShadowColor: 'black',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  optionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    alignSelf: 'center',
  },
  deleteOption: {
    backgroundColor: palette.gray,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  colorTable: {
    flexDirection: 'row',
    borderColor: '#000',
    borderWidth: 2,
    borderStyle: 'dotted',
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});

const modalStyles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderColor: '#763CAD',
    borderWidth: 5,
    height: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  modalAlert: {
    marginTop: 100,
    backgroundColor: 'white',
    borderColor: '#ed1c24',
    borderWidth: 5,
    padding: 40,
    height: 400,
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
    backgroundColor: '#ed1c24',
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

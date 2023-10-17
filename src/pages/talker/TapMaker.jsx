import {useState, useEffect, useContext} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Pressable, ScrollView, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Image, Alert, TextInput, ToastAndroid, Touchable} from 'react-native';
import {styles, palette, tapColors, dp, w_width} from '../../styles/styles';
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
  const [modalOption, setModalOption] = useState(false);
  const [modalName, setModalName] = useState(false);

  const yellow = tapColors.yellow;
  const red = tapColors.red;
  const blue = tapColors.blue;
  const green = tapColors.green;
  const pink = tapColors.pink;

  const profile = JSON.parse(activeProfile);

  const {handleSubmit, control, formState: {errors}, getValues, resetField} = useForm();

  const [tapName, setTapName] = useState('');

  const [usedColor0, setUsedColor0] = useState(red);
  const [usedColor1, setUsedColor1] = useState('');
  const [usedColor2, setUsedColor2] = useState('');
  const [usedColor3, setUsedColor3] = useState('');
  const [usedColors, setUsedColors] = useState([red, '', '', '']);

  const [text0, setText0] = useState('Opción 1');
  const [text1, setText1] = useState('Opción 2');
  const [text2, setText2] = useState('Opción 3');
  const [text3, setText3] = useState('Opción 4');
  const [texts, setTexts] = useState(['Opción 1']);

  const [optsCounter, setOpsCounter] = useState(1);

  const [colorPalette, setPalette] = useState([red, blue, yellow, green, pink]);

  const [editingColor, setEditingColor] = useState(-1);
  const [editingText, setEditingText] = useState(-1);

  const [newText, setNewText] = useState('');


  /**
   * Guarda el TAP creado
   * @param {JSON} value
   */
  const saveTap = async () => {
    const defColors = usedColors.filter((color) => color != '');
    console.log(defColors);
    const defTap = defColors.map((color, index) => {
      const option = {
        text: texts[index],
        color: color,
      };
      return option;
    });

    await addTap(profile.name, tapName, defTap);
    const modified = await AsyncStorage.getItem(profile.name);
    setProfile(modified);
    navigation.navigate('TapMenu');
  };


  const pickerIcon = <Image source={require('../../../assets/picker_icon_black.png')} style={{width: dp(20), height: dp(20)}} />;

  const alreadyExist = async () => {
    const response = await searchTap(profile.name, getValues().name);
    return response;
  }

  const paint = async (color) => {
    switch(editingColor) {
      case 0: 
        setUsedColor0(color);
        break;
      case 1: 
        setUsedColor1(color);
        break;
      case 2: 
        setUsedColor2(color);
        break;
      case 3: 
        setUsedColor3(color);
        break;
    }
  }

  useEffect(() => {
    setUsedColors([usedColor0, usedColor1, usedColor2, usedColor3]);
  }, [usedColor0, usedColor1, usedColor2, usedColor3]);

  useEffect(() => {
    setTexts([text0, text1, text2, text3]);
  }, [text0, text1, text2, text3]);

  const colorPaletteFiltered = colorPalette.filter((color) => !usedColors.includes(color));

  const colorPaletteButtons = colorPaletteFiltered.map((color, index) => 
    <TouchableOpacity key={index} style={[tapStyles.TO, {flex: 4, backgroundColor: color, margin: dp(5)}]} onPress={()=>paint(color)}>
    </TouchableOpacity>
  );

  const colorChangeView = 
    <>
      <TouchableOpacity key={'back'} style={[tapStyles.TO, {flex: 4, backgroundColor: palette.darkViolet, margin: dp(5), borderRadius: dp(15)}]} onPress={()=>setEditingColor(-1)}>
        <View>
          <Text style={{color: '#fff', fontSize: dp(20), textAlign: 'center'}}>✔</Text>
        </View>
      </TouchableOpacity>
      {colorPaletteButtons}
    </>

  const editColorButton = ((index) =>
    <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: usedColors[index], margin: dp(2)}} onPress={()=>setEditingColor(index)}>
      <View>
        <Image source={require('../../../assets/palette.png')} tintColor={'#fff'} resizeMode='contain' style={{width: dp(40), height: dp(40)}} />
      </View>
    </TouchableOpacity>
  )


  const optButton0 = 
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1, backgroundColor: '#fff', padding: dp(5)}}>
        {(editingColor == 0) ? colorChangeView : editColorButton(0)}
      </View>
      <TouchableOpacity key={0} style={[tapStyles.TO, {flex: 4, backgroundColor: usedColors[0]}]} onPress={()=> {
        setEditingText(0);  
        setModalOption(!modalOption);
      } }>
      <View style={tapStyles.box}>
        <Text style={tapStyles.button_text}> {text0} </Text>
        <Text style={tapStyles.button_text_small}> Pulsa para editar </Text>
      </View>
      </TouchableOpacity>
    </View>;

  const optButton1 = 
    <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, backgroundColor: '#fff', padding: dp(5)}}>
          {(editingColor == 1) ? colorChangeView : editColorButton(1)}
        </View>
        <TouchableOpacity key={1} style={[tapStyles.TO, {flex: 4, backgroundColor: usedColors[1]}]} onPress={()=> {
        setEditingText(1);  
        setModalOption(!modalOption);
        }}>
        <View style={tapStyles.box}>
          <Text style={tapStyles.button_text}> {text1} </Text>
          <Text style={tapStyles.button_text_small}> Pulsa para editar </Text>
        </View>
        </TouchableOpacity>
      </View>;

  const optButton2 = 
  <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1, backgroundColor: '#fff', padding: dp(5)}}>
        {(editingColor == 2) ? colorChangeView : editColorButton(2)}
      </View>
      <TouchableOpacity key={2} style={[tapStyles.TO, {flex: 4, backgroundColor: usedColors[2]}]} onPress={()=>{
        setEditingText(2);  
        setModalOption(!modalOption);
      }}>
      <View style={tapStyles.box}>
        <Text style={tapStyles.button_text}> {text2} </Text>
        <Text style={tapStyles.button_text_small}> Pulsa para editar </Text>
      </View>
      </TouchableOpacity>
    </View>;

  const optButton3 = 
  <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1, backgroundColor: '#fff', padding: dp(5)}}>
        {(editingColor == 3) ? colorChangeView : editColorButton(3)}
      </View>
      <TouchableOpacity key={3} style={[tapStyles.TO, {flex: 4, backgroundColor: usedColors[3]}]} onPress={()=>{
        setEditingText(3);  
        setModalOption(!modalOption);
      }}>
      <View style={tapStyles.box}>
        <Text style={tapStyles.button_text}> {text3} </Text>
        <Text style={tapStyles.button_text_small}> Pulsa para editar </Text>
      </View>
      </TouchableOpacity>
    </View>

  const addOpt = async () => {
    const paintNew = async () => {
      switch(optsCounter) {
        case 1:
          setUsedColor1(colorPaletteFiltered[0]); 
          setText1('Opción 2');
          break;
        case 2:
          setUsedColor2(colorPaletteFiltered[0]);
          setText2('Opción 3'); 
          break;
        case 3:
          setUsedColor3(colorPaletteFiltered[0]); 
          setText3('Opción 4');
          break;
      }
    };
    await paintNew().then(() => setOpsCounter(optsCounter+1));
  }

  const removeOpt = async () => {
    const removeNew = async () => {
      switch(optsCounter) {
        case 4:
          setUsedColor3('');
          (editingColor == 3) ? setEditingColor(-1) : null; 
          break;
        case 3:
          setUsedColor2('');
          (editingColor == 2) ? setEditingColor(-1) : null; 
          break;
        case 2:
          setUsedColor1(''); 
          (editingColor == 1) ? setEditingColor(-1) : null; 
          break;
      }
    };
    await removeNew().then(() => setOpsCounter(optsCounter-1));
  }

  const changeText = async (value) => {
    const text = getValues().text;
    switch(editingText) {
      case 0:
        setText0(text);
        break;
      case 1:
        setText1(text);
        break;
      case 2:
        setText2(text);
        break;
      case 3:
        setText3(text);
        break;
    }
    resetField('text');
    setNewText('');
  };

  console.log(texts);

  const previewOpts = texts.map((opt, index) => 
    <View key={index} style={{backgroundColor: usedColors[index], width: dp(200), height: dp(60), padding: dp(10), margin: dp(2), display: ((optsCounter < (index+1)) ? 'none' : null)}}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={tapPreview.optionText}>{texts[index]}</Text>
    </View>
  );

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>

    <Modal
      avoidKeyboard = {true}
      animationType="fade"
      visible={modalName}
      onRequestClose={() => {
        setModalName(!modalName);
      }}>
       <View style={{flex: 1, marginTop: dp(40), alignItems: 'center'}}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <View style={{alignItems: 'center'}}>
        <Text style={[styles.title, {marginBottom: dp(20), color: palette.violet}]}>Este es el resultado:</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {previewOpts}
        </View>
        <Text style={[styles.title, {marginBottom: dp(20), marginTop: dp(40), color: palette.violet}]}>¿Cómo se llamará este TAP?</Text>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          rules={{
            required: {value: true, message: 'Escribe un nombre'},
          }}
          render={({field: {onChange, value}}) => (
            <View style={{width: dp(300)}}>
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
          <TouchableOpacity
            style={[modalStyles.button, modalStyles.grayBackground]}
            onPress={() => {
              setModalName(!modalName);
            }}
          >
            <Text style={modalStyles.textStyle}>Atrás</Text>
          </TouchableOpacity>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
        </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>

      <Modal
          avoidKeyboard = {true}
          animationType="fade"
          visible={modalOption}
          onRequestClose={() => {
            setModalOption(!modalOption);
          }}>
          <View style={[styles.modalView, {justifyContent: 'center'}]}>
            <View style={[tapStyles.TO, {backgroundColor: usedColors[editingText]}]}>
              <Text style={[tapStyles.button_text, {paddingBottom: 10}]}> {(newText == '') ? texts[editingText] : newText} </Text>
            </View>
            <Text style={[styles.title, {marginBottom: dp(20), marginTop: dp(40), color: usedColors[editingText]}]}>Escribe el contenido</Text>
            <Controller
              name="text"
              defaultValue=""
              control={control}
              rules={{
                required: {value: true, message: 'Escribe el contenido'},
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  color={usedColors[editingText]}
                  borderColor={usedColors[editingText]}
                  maxLength={15}
                  textAlign={"center"}
                  error={errors.name}
                  errorText={errors?.name?.message}
                  onChangeText={(text) => {
                    setNewText(text);
                    onChange(text);
                  }}
                  value={value}
                  placeholder={texts[editingText]}
                  autoCapitalize='sentences'
                />
              )}
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.grayBackground]}
                onPress={() => {
                  resetField('text');
                  setNewText('');
                  setModalOption(!modalOption);
                }}
              >
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalStyles.button, {backgroundColor: usedColors[editingText]}]}
                onPress={() => {
                  if (newText == '') {
                    Alert.alert('¡Ups!', 'Aún no has escrito nada.', [
                      {text: 'OK'},
                    ],
                    {
                      cancelable: true,
                    });
                  } else {
                    handleSubmit(changeText)();
                    setModalOption(!setModalOption);
                  }
                }}
              >
                <Text style={modalStyles.textStyle}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>

      <View style={{flex: 1}}>
        {optButton0}
        {(optsCounter > 1) ? optButton1 : null}
        {(optsCounter > 2) ? optButton2 : null}
        {(optsCounter > 3) ? optButton3 : null}
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity disabled={(optsCounter < 2)}
          style={[{backgroundColor: ((optsCounter < 2) ? palette.gray : palette.violet)}, tapMaker.controlButton]}
          onPress={() => { removeOpt() }}
        >
          <Text style={[modalStyles.textStyle, {fontSize: dp(45)}]}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={(optsCounter > 3)}
          style={[{backgroundColor: ((optsCounter > 3) ? palette.gray : palette.violet)}, tapMaker.controlButton]}
          onPress={() => { addOpt() }}
        >
          <Text style={[modalStyles.textStyle, {fontSize: dp(45)}]}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={[{backgroundColor: palette.red}, tapMaker.controlButton]}
          onPress={() => { navigation.navigate('TapMenu');
          }}
        >
          <Text style={modalStyles.textStyle}>Descartar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{backgroundColor: palette.darkViolet}, tapMaker.controlButton]}
          onPress={() => {
            setModalName(!modalName);
          }}
        >
          <Text style={modalStyles.textStyle}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const tapPreview = StyleSheet.create({
  option: {
    width: dp(280),
    height: dp(50),
    color: '#fff',
    textShadowColor: 'black',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  optionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: dp(30),
    textShadowOffset: {width: dp(1), height: dp(1)},
    textShadowRadius: dp(2),
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '500'
  },
  deleteOption: {
    backgroundColor: palette.gray,
    width: dp(40),
    height: dp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: '#000',
    backgroundColor: '#fff',
    fontWeight: 'bold',
    fontSize: dp(30),
    padding: dp(6),
  },
});

const tapStyles = StyleSheet.create({
  TO: {
    justifyContent: 'center',
    margin: dp(5)
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: dp(40),
    textAlign: 'justify',
    color: palette.violet,
    lineHeight: 100,
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: dp(30),
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 2,
    marginTop: 10,
    textAlign: 'center',
  },
  button_text_small: {
    color: '#fff',
    fontStyle: 'italic',
    fontWeight: '500',
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: dp(25),
    textAlign: 'center',
    paddingBottom: 20,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    opacity: 0.9,
  },
});

const tapMaker = StyleSheet.create({
  controlButton: {
    flex: 1, 
    justifyContent: 'center', 
    margin: dp(10), 
    borderRadius: dp(10),
  },
  nextButton: {
    backgroundColor: palette.violet,
    color: '#fff',
    height: dp(50),
    width: dp(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dp(10),
    marginLeft: dp(20),
  },
  backButton: {
    backgroundColor: palette.violet,
    color: '#fff',
    height: dp(50),
    width: dp(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dp(10),
    marginRight: dp(20),
  },
  loadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: dp(30),
    lineHeight: dp(30),
  },
  extractor: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {width: dp(1), height: dp(1)},
    textShadowRadius: dp(2),
  },
  colorTable: {
    flexDirection: 'row',
    borderColor: '#000',
    borderWidth: dp(2),
    borderStyle: 'dotted',
    width: dp(300),
    height: dp(60),
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});

const modalStyles = StyleSheet.create({
  button: {
    borderRadius: dp(10),
    width: dp(130),
    height: dp(80),
    elevation: dp(10),
    margin: dp(15),
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
    lineHeight: dp(80),
    fontSize: (25),
  },
  modalText: {
    marginBottom: dp(40),
    textAlign: 'center',
    fontSize: (24),
    marginTop: dp(20),
    fontWeight: 'bold',
  },
});
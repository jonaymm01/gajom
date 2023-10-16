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
  const [modalName, setModalName] = useState(false);

  const yellow = tapColors.yellow;
  const red = tapColors.red;
  const blue = tapColors.blue;
  const green = tapColors.green;
  const pink = tapColors.pink;

  const profile = JSON.parse(activeProfile);

  const {handleSubmit, control, formState: {errors}, getValues, resetField} = useForm();

  const [defOpts, setDefOpts] = useState(['']);
  const [tapName, setTapName] = useState('');

  const [usedColor0, setUsedColor0] = useState(red);
  const [usedColor1, setUsedColor1] = useState('');
  const [usedColor2, setUsedColor2] = useState('');
  const [usedColor3, setUsedColor3] = useState('');
  const [usedColors, setUsedColors] = useState([red, '', '', '']);

  const [optsCounter, setOpsCounter] = useState(1);

  const [colorPalette, setPalette] = useState([red, blue, yellow, green, pink]);

  const [editingColor, setEditingColor] = useState(-1);

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
      <TouchableOpacity key={0} style={[tapStyles.TO, {flex: 4, backgroundColor: usedColors[0]}]} onPress={()=>console.log(usedColors[0])}>
      <View style={tapStyles.box}>
        <Text numberOfLines={2} adjustsFontSizeToFit style={tapStyles.button_text}> Opción {0} </Text>
      </View>
      </TouchableOpacity>
    </View>;

  const optButton1 = 
    <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, backgroundColor: '#fff', padding: dp(5)}}>
          {(editingColor == 1) ? colorChangeView : editColorButton(1)}
        </View>
        <TouchableOpacity key={1} style={[tapStyles.TO, {flex: 4, backgroundColor: usedColors[1]}]} onPress={()=>console.log(usedColors[1])}>
        <View style={tapStyles.box}>
          <Text numberOfLines={2} adjustsFontSizeToFit style={tapStyles.button_text}> Opción {1} </Text>
        </View>
        </TouchableOpacity>
      </View>;

  const optButton2 = 
  <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1, backgroundColor: '#fff', padding: dp(5)}}>
        {(editingColor == 2) ? colorChangeView : editColorButton(2)}
      </View>
      <TouchableOpacity key={2} style={[tapStyles.TO, {flex: 4, backgroundColor: usedColors[2]}]} onPress={()=>console.log(usedColors[2])}>
      <View style={tapStyles.box}>
        <Text numberOfLines={2} adjustsFontSizeToFit style={tapStyles.button_text}> Opción {2} </Text>
      </View>
      </TouchableOpacity>
    </View>;

  const optButton3 = 
  <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1, backgroundColor: '#fff', padding: dp(5)}}>
        {(editingColor == 3) ? colorChangeView : editColorButton(3)}
      </View>
      <TouchableOpacity key={3} style={[tapStyles.TO, {flex: 4, backgroundColor: usedColors[3]}]} onPress={()=>console.log(usedColors[3])}>
      <View style={tapStyles.box}>
        <Text numberOfLines={2} adjustsFontSizeToFit style={tapStyles.button_text}> Opción {3} </Text>
      </View>
      </TouchableOpacity>
    </View>

  const addOpt = async () => {
    const paintNew = async () => {
      switch(optsCounter) {
        case 1:
          setUsedColor1(colorPaletteFiltered[0]); 
          break;
        case 2:
          setUsedColor2(colorPaletteFiltered[0]); 
          break;
        case 3:
          setUsedColor3(colorPaletteFiltered[0]); 
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

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>

      <Modal
          avoidKeyboard = {true}
          animationType="fade"
          visible={modalName}
          onRequestClose={() => {
            setModalName(!modalName);
          }}>
          <View style={[styles.modalView, {justifyContent: 'center'}]}>
            <View style={{flexDirection: 'row', paddingLeft: dp(10), paddingRight: dp(10), borderWidth: dp(3), borderColor: palette.violet}}>
              <Text style={[styles.title, {marginBottom: dp(20), marginTop: dp(20), color: palette.violet, textDecorationLine: 'line-through'}]}> Opción </Text>
            </View>
            <Text style={[styles.title, {marginBottom: dp(20), marginTop: dp(40), color: palette.violet}]}>Escribe el contenido</Text>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              rules={{
                required: {value: true, message: 'Escribe el contenido'},
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  maxLength={12}
                  textAlign={"center"}
                  error={errors.name}
                  errorText={errors?.name?.message}
                  onChangeText={(text) => {
                    setNewName(text);
                    onChange(text);
                  }}
                  value={value}
                  placeholder={activeProfile.name}
                  autoCapitalize='sentences'
                />
              )}
            />
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[modalStyles.button, modalStyles.grayBackground]}
                onPress={() => {
                  resetField('name');
                  setModalName(!modalName);
                }}
              >
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[modalStyles.button, modalStyles.violetBackground]}
                onPress={() => {
                }}
              >
                <Text style={modalStyles.textStyle}>Aplicar</Text>
              </Pressable>
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
          <Text style={modalStyles.textStyle}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={(optsCounter > 3)}
          style={[{backgroundColor: ((optsCounter > 3) ? palette.gray : palette.violet)}, tapMaker.controlButton]}
          onPress={() => { addOpt() }}
        >
          <Text style={modalStyles.textStyle}>+</Text>
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
    fontSize: dp(20),
    textShadowOffset: {width: dp(1), height: dp(1)},
    textShadowRadius: dp(2),
    alignSelf: 'center',
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
    fontSize: dp(50),
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 2,
    marginTop: 10,
    paddingBottom: 20,
    textAlign: 'center',
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
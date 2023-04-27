import {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Pressable, ScrollView} from 'react-native';
import {styles, palette} from '../../styles/styles';
import {Controller, set, useForm} from 'react-hook-form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {setTap, getTaps, addTap} from '../../_helpers/UserContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setActive} from '../../_helpers/storage';


/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function TapMaker({route, navigation}) {
  const [activeUser, loadActive] = useState(0);
  const [shouldRefresh, setRefresh] = useState(false);

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

  const {handleSubmit, control, formState: {errors}, getValues} = useForm();

  const [opt, setOpt] = useState(1);
  const [opt1Text, setText1] = useState('');
  const [opt2Text, setText2] = useState('');
  const [opt3Text, setText3] = useState('');
  const [opt4Text, setText4] = useState('');

  const [opt1Color, setColor1] = useState('');
  const [opt2Color, setColor2] = useState('');
  const [opt3Color, setColor3] = useState('');
  const [opt4Color, setColor4] = useState('');

  const [arrow, setArrow] = useState(['→', '', '', '']);

  const [colorsOff, setColorOff] = useState(['']);

  const colorButtons = () => {
    const colors = [
      'red', 'blue', 'green', 'yellow',
    ];
    const colorsOn = colors.filter((x) => !colorsOff.includes(x));
    const output = colorsOn.map((color) => <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={() => setColor(color)}/>);
    return output;
  };

  /**
   * Renderiza la flecha que señala la opción
   */
  const arrowRender = () => {
    switch (opt) {
      case 1:
        setArrow(['→', '', '', '']);
        break;
      case 2:
        setArrow(['', '→', '', '']);
        break;
      case 3:
        setArrow(['', '', '→', '']);
        break;
      case 4:
        setArrow(['', '', '', '→']);
        break;
    }
  };

  useEffect(() => {
    arrowRender();
  }, [opt]);

  useEffect(() => {
    setColorOff([opt1Color, opt2Color, opt3Color, opt4Color]);
  }, [opt1Color, opt2Color, opt3Color, opt4Color]);

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
   */
  const saveTap = async () => {
    addTap(user.email, 'New', {});
    const modified = await AsyncStorage.getItem(user.email);
    setActive(JSON.parse(modified));
    refreshData();
    navigation.navigate('TapMaker');
  };

  return (
    <View style={styles.blank_background}>
      <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Pressable
          style={tapMaker.backButton}
          onPress={() => {
            if (opt > 1) {
              setOpt(opt-1);
            }
          }}
        >
          <Text style={tapMaker.loadText}> ← </Text>
        </Pressable>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Controller
            name="opt1"
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
                placeholder={'Escribe una palabra'}
              />
            )}
          />
        </View>
        <Pressable
          style={tapMaker.nextButton}
          onPress={() => {
            if (opt < 4) {
              setOpt(opt+1);
            }
          }}
        >
          <Text style={tapMaker.loadText}> → </Text>
        </Pressable>
      </View>

      <View style={[styles.container, {flexDirection: 'row', flex: 1}]}>
        <>
          {colorButtons()}
        </>
      </View>

      <View style={[styles.container, {flexDirection: 'row', flex: 2}]}>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={() => setColor('white')}>
          <View style={styles.button_container}>
            <Text style={tapPreview.option}> Borrar color </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', flex: 6}}>
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
      </View>


      <View style={[styles.container, {flexDirection: 'row', flex: 2}]}>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.gray}]} onPress={() => navigation.navigate('TapMenu')}>
          <View style={styles.button_container}>
            <Text style={[styles.button_text, {lineHeight: 70}]}>DESCARTAR</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: palette.violet}]} onPress={() => saveTap()}>
          <View style={styles.button_container}>
            <Text style={[styles.button_text, {lineHeight: 70}]}>CONFIRMAR</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: palette.violet,
    color: '#fff',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  loadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 30,
  },
});

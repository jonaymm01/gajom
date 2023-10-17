import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {palette, styles, dp} from '../../styles/styles';
import PictoList from '../../components/PictoList';
import {DefaultPictos} from '../../content/DefaultPictos';
import * as Speech from 'expo-speech';

/**
   * Método para reproducir el texto de un Pictograma
   * @param {string} text
   */
const speak = (text) => {
  Speech.speak(text);
};

/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function Pictos() {    
  const [pressed, setPressed] = useState(''); // Nombre de la categoría seleccionada
  const [pictoList, setList] = useState(DefaultPictos.data.categories);
  const [path, setPath] = useState([]);
  const [text, setText] = useState('');

  const [filteredContent, setFiltered] = useState([]); // Contenido se la categoría filtrado por búsqueda
  const [filtered, isFiltered] = useState(false); // Valor booleano que indica si se está filtrando o no

  const backTo = (picto) => {
    speak(picto.name);
    setText(picto.text);
    const index = path.findIndex((p) => p.name == picto.name);
    let newPath = path;
    newPath.length = index+1;
    setList(newPath.at(-1).content);
    setPath(newPath);
    setPressed('');
  };

  const reboot = () => {
    setList(DefaultPictos.data.categories);
    setPath([]);
    setPressed('');
  };

  useEffect(() => {
    if (pressed !== '') {
      const selectedPicto = pictoList.find((picto) => picto.name === pressed);
      if (selectedPicto.content.length > 0) {
        setList(selectedPicto.content);
        setPath(path.concat(selectedPicto));
      }
    }
  }, [pressed]);
  
  const pathButtons = path.map((picto, index) =>
      <TouchableOpacity key={picto.name+index} style={pathStyles.button} onPress={() => backTo(picto)}>
        <Text style={pathStyles.buttonText}>
          {picto.name}
        </Text>
      </TouchableOpacity>,
    );

  const pathNames = path.map((picto) => picto.name);

  const restartButton = [
        <TouchableOpacity key={'start'} style={pathStyles.backButton} onPress={() => reboot()}>
          <Text style={[pathStyles.buttonText, {textAlign: 'center'}]}>
            Inicio
          </Text>
        </TouchableOpacity>
  ]

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>    
      <View style={pathStyles.container}>
        {restartButton.concat(pathButtons)}
      </View>
      <ScrollView style={{backgroundColor: '#fff'}} persistentScrollbar={true}>
        <View style={pickerStyles.container}>
          <PictoList setText={setText} setPressed={setPressed} list={(filtered) ? filteredContent : pictoList}/>
        </View>
      </ScrollView>
      <View style={{padding: dp(45), position: 'absolute', left: 0, right: 0, bottom: 0, display: (text == '') ? 'none' : null, backgroundColor: '#fff', opacity: 0.9}}/>   
      <View style={{margin: dp(10), position: 'absolute', left: 0, right: 0, bottom: 0, display: (text == '') ? 'none' : null}}>
        <TouchableOpacity style={{backgroundColor: palette.darkViolet, justifyContent: 'center', padding: dp(20)}} onPress={() => speak(text)}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={{color: '#fff', textAlign: 'center', fontSize: dp(20), fontWeight: '500'}}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>    
    </View>
  );
}

const pickerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: dp(120),
  },
});

const pathStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: dp(20),
  },
  button: {
    backgroundColor: palette.violet,
    padding: dp(15),
    margin: dp(5),
    borderRadius: dp(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: dp(20),
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: palette.gray,
    borderRadius: dp(10),
    margin: dp(5),
    padding: dp(15)
  }
});

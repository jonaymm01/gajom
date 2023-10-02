import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {palette, styles} from '../../styles/styles';
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
  const [text, onChangeText] = useState(''); // Texto insertado en la barra de búsqueda
  
  const [pressed, setPressed] = useState(''); // Nombre de la categoría seleccionada
  const [pictoList, setList] = useState(DefaultPictos.data.categories);
  const [path, setPath] = useState([]);
  
  const [filteredContent, setFiltered] = useState([]); // Contenido se la categoría filtrado por búsqueda
  const [filtered, isFiltered] = useState(false); // Valor booleano que indica si se está filtrando o no

  const backTo = (picto) => {
    speak(picto.name);
    const index = path.findIndex((p) => p.name == picto.name);
    let newPath = path;
    newPath.length = index+1;
    setList(newPath.at(-1).content);
    setPath(newPath);
    console.log(newPath);
    setPressed('');
  };

  const reboot = () => {
    setList(DefaultPictos.data.categories);
    setPath([]);
  };


  useEffect(() => {
    if (pressed !== '') {
      const selectedPicto = pictoList.find((picto) => picto.name === pressed);
      if (selectedPicto.content.length > 0) {
        setList(selectedPicto.content);
        setPath(path.concat(selectedPicto));
        console.log("content: ", selectedPicto.content)
      }
    }
    console.log("path:", path);
  }, [pressed]);

  useEffect(() => {
    let filtered = []
    if (text !== '') {
      filtered = pictoList.filter((picto) => picto.name.toLowerCase().includes(text.toLowerCase()));
      isFiltered(true);
      setFiltered(filtered);
    } else {
      isFiltered(false);
    }
  }, [text]);
  
  const pathButtons = path.map((picto, index) =>
      <TouchableOpacity key={picto.name+index} style={pathStyles.button} onPress={() => backTo(picto)}>
        <Text style={pathStyles.buttonText}>
          {picto.name}
        </Text>
      </TouchableOpacity>,
    );

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
        <TouchableOpacity style={pathStyles.backButton} onPress={() => reboot()}>
          <Text style={[pathStyles.buttonText, {textAlign: 'center'}]}>
            Volver a empezar
          </Text>
        </TouchableOpacity>
      <View style={pathStyles.container}>
         {pathButtons}
      </View>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={pickerStyles.container}>
          <PictoList setPressed={setPressed} list={(filtered) ? filteredContent : pictoList}/>
        </View>
      </ScrollView>
    </View>
  );
}

const pickerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

const pathStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    backgroundColor: palette.violet,
    padding: 15,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: palette.gray,
    borderRadius: 10,
    margin: 5,
    padding: 15
  }
});

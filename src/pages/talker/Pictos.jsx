import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {palette, styles} from '../../styles/styles';
import PictoList from '../../components/PictoList';
import {DefaultPictos} from '../../content/DefaultPictos';
import {Picker} from '@react-native-picker/picker';
import { SearchBar } from '../../components/SearchBar';
/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function Pictos() {  
  const [text, onChangeText] = useState(''); // Texto insertado en la barra de búsqueda
  const [category, setCategory] = useState('all'); // Nombre de la categoría seleccionada

  const selectedCat = [];
  const catList = DefaultPictos.data.categories;
  const allPictos = catList.map((cat) => selectedCat.concat(cat.content)).flat();
  const [catContent, setContent] = useState(allPictos); // Contenido de la categoría seleccionada
  
  const [filteredContent, setFiltered] = useState([]); // Contenido se la categoría filtrado por búsqueda
  const [filtered, isFiltered] = useState(false); // Valor booleano que indica si se está filtrando o no


  const catNames = DefaultPictos.data.categories.map((cat) => cat.name);

  const onValueChanged = (value, previousValue) => {
    this.setState({selectedItem: numberValue});
    return value;
  };

  useEffect(() => {
    if (category !== 'all') {
      const selectedCat = catList.find((cat) => cat.name === category);
      setContent(selectedCat.content);
    } else {
      const selectedCat = [];
      const filteredList = catList.map((cat) => selectedCat.concat(cat.content));
      setContent(filteredList.flat());
    }
  }, [category]);

  useEffect(() => {
    let filtered = []
    if (text !== '') {
      filtered = catContent.filter((picto) => picto.text.toLowerCase().startsWith(text.toLowerCase()));
      isFiltered(true);
      setFiltered(filtered);
    } else {
      isFiltered(false);
    }
  }, [text]);
  

  return (
    <>
      <View style={{backgroundColor: '#fff'}}>
        <Picker
          style={pickerStyles.picker}
          dropdownIconColor={'#fff'}
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}>
          <Picker.Item style={pickerStyles.pickerOption} label={'✦ Todos'} value={'all'} />
          <Picker.Item style={pickerStyles.pickerOption} label={'❯  Acciones'} value={'acciones'} />
          <Picker.Item style={pickerStyles.pickerOption} label={'❯  Entorno'} value={'entorno'} />
          <Picker.Item style={pickerStyles.pickerOption} label={'❯  Sensaciones'} value={'sensaciones'} />
          <Picker.Item style={pickerStyles.pickerOption} label={'❯  Ánimo'} value={'animo'} />
        </Picker>
        <View style={{alignSelf: 'center', margin: 20}}>
         <SearchBar placeholder={"Busca un pictograma"} width={260} autoCapitalize={'none'} autoCorrect={false} text={text} textChanger={onChangeText}/>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={pickerStyles.container}>
          <PictoList list={(filtered) ? filteredContent : catContent}/>
        </View>
      </ScrollView>
    </>
  );
}

const pickerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  picker: {
    backgroundColor: palette.violet,
    height: 100,
    margin: 10,
    color: '#fff',
    elevation: 10,
    fontSize: 20,
  },
  pickerOption: {
    fontSize: 25,
    color: palette.violet,
  },
});

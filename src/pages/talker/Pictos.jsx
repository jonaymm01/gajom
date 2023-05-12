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
  const [text, onChangeText] = useState('');
  const [category, setCategory] = useState('Todos');

  const selectedCat = [];
  const catList = DefaultPictos.data.categories;

  const [catContent, setContent] = useState(catList.map((cat) => selectedCat.concat(cat.content)).flat());
  const [filteredContent, setFiltered] = useState([]);

  const catNames = DefaultPictos.data.categories.map((cat) => cat.name);

  const onValueChanged = (value, previousValue) => {
    this.setState({selectedItem: numberValue});
    return value;
  };

  useEffect(() => {
    if (category !== 'Todos') {
      const selectedCat = catList.find((cat) => cat.name === category);
      setContent(selectedCat.content);
    } else {
      const selectedCat = [];
      const filteredList = catList.map((cat) => selectedCat.concat(cat.content));
      setContent(filteredList.flat());
    }
  }, [category]);

  useEffect(() => {
    const filtered =
    text !== ''
      ? catContent.filter((picto) => picto.text.toLowerCase().startsWith(text.toLowerCase()))
      : catContent;
    setFiltered(filtered);
  }, [text]);


  const pickerItems = catList.map((name, index) =>
    <Picker.Item key={index} label={name} value={name} />
  );

  return (
    <>
      <View style={{backgroundColor: '#fff'}}>
        <Picker
          style={pickerStyles.picker}
          dropdownIconColor={'#fff'}
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) =>
            setCategory(itemValue)
          }>
          <Picker.Item style={pickerStyles.pickerOption} label={'❯ Todos'} value={'Todos'} />
          <Picker.Item style={pickerStyles.pickerOption} label={'❯ Necesidades'} value={'Necesidades'} />
          <Picker.Item style={pickerStyles.pickerOption} label={'❯ Lugares'} value={'Lugares'} />
        </Picker>
        <View style={{alignSelf: 'center', margin: 20}}>
         <SearchBar placeholder={"Busca un pictograma"} width={260} autoCapitalize={'none'} autoCorrect={false} text={text} textChanger={onChangeText}/>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={pickerStyles.container}>
          <PictoList list={(filteredContent === []) ? catContent : filteredContent}/>
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

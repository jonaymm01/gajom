import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {palette, styles} from '../../styles/styles';
import PictoList from '../../components/PictoList';
import {DefaultPictos} from '../../content/DefaultPictos';
import {Picker} from '@react-native-picker/picker';
/**
 * Método para renderizar página de Pictogramas.
 * @return {JSX.Element}
 */
export function Pictos() {
  const [category, setCategory] = useState(DefaultPictos.data.categories[0].name);
  const [catContent, setContent] = useState(DefaultPictos.data.categories[0].content);
  const catNames = DefaultPictos.data.categories.map((cat) => cat.name);
  const catList = DefaultPictos.data.categories;

  const onValueChanged = (value, previousValue) => {
    this.setState({selectedItem: numberValue});
    return value;
  };

  useEffect(() => {
    const selectedCat = catList.find((cat) => cat.name === category);
    setContent(selectedCat.content);
  }, [category]);

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
          <Picker.Item style={pickerStyles.pickerOption} label={'❯ Necesidades'} value={'Necesidades'} />
          <Picker.Item style={pickerStyles.pickerOption} label={'❯ Lugares'} value={'Lugares'} />
        </Picker>
      </View>
      <ScrollView>
        <View style={pickerStyles.container}>
          <PictoList list={catContent}/>
        </View>
      </ScrollView>
    </>
  );
}

const pickerStyles = StyleSheet.create({
  container: {
    flex: 1,
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

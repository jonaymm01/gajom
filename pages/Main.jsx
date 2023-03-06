import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity } from 'react-native';

export function Main() {
  const [count, setCount] = useState(0);
  const onPress = () => alert('A');
    return (
      <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/logo/logo_gajom.png')} 
        style={{width: 150, height: 150}}/>
      </View>
      <View style={styles.content}>
        <Text>LOGOPEDAZO</Text>
      </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    /*buttons_container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    button: {
      height: 80,
      width: 300,
      alignItems: 'center',
      backgroundColor: '#763CAD',
      borderRadius: 40,
      borderColor: '#763CAD',
      marginTop: 10
    },
    button_text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 80
    },*/
});
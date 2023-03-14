import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
    },
    button: {
      flex: 1, 
      borderWidth: 5,
      borderColor: 'white'

    },
    logopedazo_container: {
      flex: 1, 
      backgroundColor: '#000',
      fontSize: 16,
      width: 30
    },
    logopedazo_title: {
      flex: 1, 
      color: '#fff',
      fontSize: 30,
      justifyContent: 'center',
      fontWeight: 'bold',
      fontStyle: 'italic',
      lineHeight: 80
    },
    logopedazo_text: {
      flex: 1, 
      color: '#fff',
      fontSize: 20,
      justifyContent: 'center',
      marginTop: -60
    },
    button_container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    button_small: {
      height: 80,
      width: 300,
      alignItems: 'center',
      backgroundColor: '#763CAD',
      borderRadius: 40,
      borderColor: '#763CAD',
      marginTop: 10
    },
    button_text: {
      flex: 1,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 120,
    },
});
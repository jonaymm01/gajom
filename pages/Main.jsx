import { StyleSheet, Text, View, Image } from 'react-native';

export function Main() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Página principal</Text>
        <Image source={require('../assets/favicon.png')} />
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
    text: {
      lineHeight: 100
    }
});
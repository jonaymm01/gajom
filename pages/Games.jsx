import { StyleSheet, Text, View } from 'react-native';

export function Games() {
    return (
      <View style={styles.container}>
        <Text>Menú de Juegos</Text>
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
});
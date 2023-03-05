import { StyleSheet, Text, View } from 'react-native';

export function Main() {
    return (
      <View style={styles.container}>
        <Text>Página principal</Text>
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
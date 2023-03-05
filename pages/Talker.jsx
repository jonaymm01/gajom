import { StyleSheet, Text, View } from 'react-native';

export function Talker() {
    return (
      <View style={styles.container}>
        <Text>Menú de Comunicador</Text>
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
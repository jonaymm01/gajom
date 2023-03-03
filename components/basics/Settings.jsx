import { StyleSheet, Text, View } from 'react-native';

export function Settings() {
    return (
      <View style={styles.container}>
        <Text>avemaria!</Text>
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
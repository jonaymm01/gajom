import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Método para cargar un tap en el usuario
 * @param {string} email
 * @param {JSON} taps
 */
export const setTap = async (email, taps) => {
  await AsyncStorage.getItem(email).then((user) => {
    AsyncStorage.mergeItem(
        email,
        JSON.stringify(taps),
        () => {
          AsyncStorage.getItem(email, (err, result) => {
            console.log('setTap:', result);
            return result;
          });
        },
    );
  });
};

/**
 * Método para eliminar un tap del usuario
 * @param {*} value
 */
export const delTap = async (value) => {
  const email = value.email;
  try {
    await AsyncStorage.setItem(email, JSON.stringify(value));
    console.log('Se ha registrado el usuario', value.name);
  } catch (error) {
    console.log(error);
  }
};

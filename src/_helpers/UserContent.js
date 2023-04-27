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

export const getTaps = async (email) => {
  await AsyncStorage.getItem(email).then((user) => {
    const taps = JSON.parse(user).taps.data;
    console.log(taps);
    return taps;
  });
};

export const addTap = async (email, name, options) => {
  await AsyncStorage.getItem(email).then((user) => {
    const taps = JSON.parse(user).taps.data;
    taps.push(
        {
          'key': 0,
          'text': name,
          'options': options,
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

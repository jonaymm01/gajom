import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Método para cargar un nuevo usuario en la base de datos
 * @param {*} value
 */
export const setUser = async (value) => {
  const email = value.email;
  try {
    await AsyncStorage.setItem(email, JSON.stringify(value));
    console.log('Se ha registrado el usuario', value.name);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Método para recuperar la información de un usuario
 * @param {*} value
 */
export const getUser = async (value) => {
  try {
    await AsyncStorage.getItem(value);
  } catch (error) {
    console.log(error);
  };
};

/**
 * Método para definir un usuario como el usuario activo (Sesión iniciada)
 * @param {*} value
 * @return {boolean}
 */
export const setActive = async (value) => {
  if (value !== null) {
    let pass; let ActiveUser;
    try {
      await AsyncStorage.getItem(value.email).then((user) => {
        if (value.password.localeCompare(JSON.parse(user).password) == 0) {
          pass = true;
          ActiveUser = user;
        } else {
          pass = false;
        }
      });
      if (pass) {
        await AsyncStorage.setItem('active', ActiveUser).then(() => {
        });
      }
      return pass;
    } catch (error) {
      console.log(error);
    }
  } else {
    await AsyncStorage.setItem('active', '{}');
  };
};

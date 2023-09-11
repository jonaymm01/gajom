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
 * Método para cargar un nuevo usuario en la base de datos
 * @param {*} value
 */
export const setProfile = async (value) => {
  const name = value.name;
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
    console.log('Se ha añadido el perfil', value.name);
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
 * Método para recuperar la información de un usuario
 * @param {*} value
 */
export const getProfile = async (value) => {
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
  if ((value !== null) && (value !== '{}')) {
    const userValue = JSON.parse(value);
    let pass; let ActiveUser;
    try {
      await AsyncStorage.getItem(userValue.email).then((user) => {
        if (userValue.password.localeCompare(JSON.parse(user).password) == 0) {
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
      return {pass: pass, user: ActiveUser};
    } catch (error) {
      console.log(error);
    }
  } else {
    await AsyncStorage.setItem('active', '{}');
  };
};

/**
 * Método para definir un usuario como el usuario activo (Sesión iniciada)
 * @param {*} value
 * @return {boolean}
 */
export const setActiveProfile = async (value) => {
  if ((value !== null) && (value !== '{}')) {
    const profileValue = JSON.parse(value);
    let pass; let ActiveProfile;
    try {
      await AsyncStorage.getItem(profileValue.name).then((profile) => {
        if (profileValue.pin.localeCompare(JSON.parse(profile).pin) == 0) {
          pass = true;
          ActiveProfile = profile;
        } else {
          pass = false;
        }
      });
      if (pass) {
        await AsyncStorage.setItem('active', ActiveProfile).then(() => {
        });
      }
      return {pass: pass, profile: ActiveProfile};
    } catch (error) {
      console.log(error);
    }
  } else {
    await AsyncStorage.setItem('active', '{}');
  };
};
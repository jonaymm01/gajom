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
  let taps = [];
  await AsyncStorage.getItem(email).then((user) => {
    taps = JSON.parse(user).taps.data;
    const newTap = {
      'key': 0,
      'text': name,
      'options': options,
    };
    taps.push(newTap);
  });
  const newData = {
    taps: {
      data: taps,
    },
  };
  await AsyncStorage.mergeItem(email, JSON.stringify(newData));
};


export const delTap = async (email, name, options) => {
  let taps = [];
  await AsyncStorage.getItem(email).then((user) => {
    taps = JSON.parse(user).taps.data;
    const deletedTap = {
      'key': 0,
      'name': name,
      'options': options,
    };
    console.log('Eliminado TAP: ', deletedTap.name);
    for (let i = 0; i < taps.length; i++) {
      const obj = taps[i];
      if ((obj.name !== name) && (obj.options !== options)) {
        taps.splice(i, 1);
      }
    }
  });
  const newData = {
    taps: {
      data: taps,
    },
  };
  await AsyncStorage.mergeItem(email, JSON.stringify(newData));
  const user = await AsyncStorage.getItem(email);
};

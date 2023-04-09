import AsyncStorage from '@react-native-async-storage/async-storage'

export const setUser = async (value) => {
  const email = value.email;
  try {
    await AsyncStorage.setItem(email, JSON.stringify(value));
    console.log('Se ha registrado el usuario', value.name)
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (value) => {
  try {
    await AsyncStorage.getItem(value)
  } catch (error) {
   console.log(error); 
  };
}

export const setActive = async (value) => {
  let pass, ActiveUser
  try {
    await AsyncStorage.getItem(value.email).then((user) => {
      if (value.password.localeCompare(JSON.parse(user).password) == 0) {
        pass = true;
        ActiveUser = user;
      } else {
        pass = false;
      }
    })
    if (pass) {
    await AsyncStorage.setItem('active', ActiveUser).then(() => {
    })
    }
    return pass
  } catch (error) {
    console.log(error);
  }
};
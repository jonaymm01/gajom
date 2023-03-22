import AsyncStorage from '@react-native-async-storage/async-storage'


export const setUser = async (value) => {
  const email = value.email;
  try {
    await AsyncStorage.setItem(email, JSON.stringify(value));
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
  try {
    const user = await AsyncStorage.getItem(value)
    console.log(user)
    await AsyncStorage.setItem('active', user);
  } catch (error) {
    console.log(error);
  }
};
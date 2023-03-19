import { AsyncStorage} from 'react-native';

export const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, age)
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }
  
export const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
  
      if (value !== null) {
        setInput(value);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

export const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage successfully cleared!');
    } catch (e) {
      alert('Failed to clear the async storage.');
    }
};

export const onChangeText = value => setInput(value);

export const onSubmitEditing = () => {
  if (!input) return;

  saveData(input);
  setInput('');
};
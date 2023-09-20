import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Método para cargar un tap en el usuario
 * @param {string} name
 * @param {JSON} taps
 */
export const setTap = async (name, taps) => {
  await AsyncStorage.getItem(name).then((user) => {
    AsyncStorage.mergeItem(
        name,
        JSON.stringify(taps),
        () => {
          AsyncStorage.getItem(name, (err, result) => {
            console.log('setTap:', result);
            return result;
          });
        },
    );
  });
};

export const getTaps = async (name) => {
  await AsyncStorage.getItem(name).then((user) => {
    const taps = JSON.parse(user).taps.data;
    console.log(taps);
    return taps;
  });
};

export const addTap = async (profile, name, options) => {
  let taps = [];
  await AsyncStorage.getItem(profile).then((user) => {
    console.log(user);
    console.log(typeof(JSON.parse(user).taps));
    if (typeof(JSON.parse(user).taps) !== 'undefined') {
      taps = JSON.parse(user).taps.data;
    }
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
  await AsyncStorage.mergeItem(profile, JSON.stringify(newData));
};

export const delTap = async (profile, name, options) => {
  let taps = [];
  await AsyncStorage.getItem(profile).then((user) => {
    taps = JSON.parse(user).taps.data;
    const deletedTap = {
      'key': 0,
      'name': name,
      'options': options,
    };
    for (let i = 0; i < taps.length; i++) {
      const obj = taps[i];
      if ((obj.text === name)) {
        taps.splice(i, 1);
      }
    }
  });
  const newData = {
    taps: {
      data: taps,
    },
  };
  await AsyncStorage.mergeItem(profile, JSON.stringify(newData));
  const user = await AsyncStorage.getItem(profile);
};

export const delPin = async (profile) => {
  const pinZero = {
    pin: '0',
  };
  await AsyncStorage.mergeItem(profile, JSON.stringify(pinZero));
  const user = await AsyncStorage.getItem(profile);
};

export const addQuestion = async (name, start, end) => {
  let questions = [];
  let questionsOutput = [];
  let newDataArray = [];
  await AsyncStorage.getItem(name).then((user) => {
    if (typeof(JSON.parse(user).questions) !== 'undefined') {
      questions = JSON.parse(user).questions.data;
      newDataArray = questions;
      const questionsWithStart = questions.filter((q) => q.start === start);
      newDataArray = questions.filter((q) => q.start !== start);
      if ((typeof(questionsWithStart) !== 'undefined') && (questionsWithStart.length > 0)) {
        questionsOutput = questionsWithStart[0].ends;
        newDataArray.push(questionsWithStart[0]);
        questionsOutput.push(end);
      } else {
        questionsOutput.push(end);
        newDataArray.push({
          start: start,
          ends: questionsOutput,
        });
      }
    } else {
      questionsOutput.push(end);
      newDataArray.push({
        start: start,
        ends: questionsOutput,
      });
    }
  });
  const newData = {
    questions: {
      data: newDataArray
    },
  };
  await AsyncStorage.mergeItem(name, JSON.stringify(newData));
};

export const deleteQuestion = async (name, start, end) => {
  let questions = [];
  let questionsOutput = [];
  let newDataArray = [];

  await AsyncStorage.getItem(name).then((user) => {
    questions = JSON.parse(user).questions.data;
    newDataArray = questions;
    const questionsWithStart = questions.filter((q) => q.start === start);
    questionsOutput = questionsWithStart[0].ends;
    console.log('array con elemento a eliminar: ', questionsOutput);
    const endIndex = questionsOutput.indexOf(end);
    if (endIndex > -1) {
      newDataArray = questions.filter((q) => q.start !== start);
      questionsOutput.splice(endIndex, 1);
      newDataArray.push(
        {
        start: start,
        ends: questionsOutput,
        },
      )
    }
  });
  const newData = {
    questions: {
      data: newDataArray
    },
  };
  await AsyncStorage.mergeItem(name, JSON.stringify(newData));
};

export const searchQuestion = async (name, start, end) => {
  let response = false;
  await AsyncStorage.getItem(name).then((user) => {
    if (typeof(JSON.parse(user).questions) !== 'undefined') {
      const questions = JSON.parse(user).questions.data;
      const questionsWithStart = questions.filter((q) => q.start === start);
      if (typeof(questionsWithStart[0]) !== 'undefined') {
        const questionsOutput = questionsWithStart[0].ends;
        response = questionsOutput.some((element) => element === end);
      }
    }
  });
  return response;
};

export const searchTap = async (profile, name) => {
  let found = false;
  await AsyncStorage.getItem(profile).then((user) => {
    if (typeof(JSON.parse(user).taps) !== 'undefined') {
      const taps = JSON.parse(user).taps.data;
      found = taps.some((tap) => tap.text === name);
      console.log('found: ', found);
    }
  });
  return found;
};
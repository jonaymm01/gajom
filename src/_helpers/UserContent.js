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
  await AsyncStorage.mergeItem(email, JSON.stringify(newData));
};

export const addQuestion = async (email, start, end) => {
  let questions = [];
  let questionsOutput = [];
  await AsyncStorage.getItem(email).then((user) => {
    if (typeof(JSON.parse(user).questions) !== 'undefined') {
      questions = JSON.parse(user).questions.data;
      const questionsWithStart = questions.filter((q) => q.start === start);
      if ((typeof(questionsWithStart) !== 'undefined') && (questionsWithStart.length > 0)) {
        questionsOutput = questionsWithStart[0].ends;
      }
      questionsOutput.push(end);
    }
  });
  const newData = {
    questions: {
      data: [
        {
          start: start,
          ends: questionsOutput,
        },
      ],
    },
  };
  await AsyncStorage.mergeItem(email, JSON.stringify(newData));
};

export const deleteQuestion = async (email, start, end) => {
  let questions = [];
  let questionsOutput = [];
  await AsyncStorage.getItem(email).then((user) => {
    questions = JSON.parse(user).questions.data;
    const questionsWithStart = questions.filter((q) => q.start === start);
    questionsOutput = questionsWithStart[0].ends;
    console.log('questOutput: ', questionsOutput);
    const endIndex = questionsOutput.indexOf(end);
    if (endIndex > -1) {
      questionsOutput.splice(endIndex, 1);
    }
  });
  const newData = {
    questions: {
      data: [
        {
          start: start,
          ends: questionsOutput,
        },
      ],
    },
  };
  await AsyncStorage.mergeItem(email, JSON.stringify(newData));
};

export const searchQuestion = async (email, start, end) => {
  let response = false;
  await AsyncStorage.getItem(email).then((user) => {
    const questions = JSON.parse(user).questions.data;
    const questionsWithStart = questions.filter((q) => q.start === start);
    if (typeof(questionsWithStart[0]) !== 'undefined') {
      const questionsOutput = questionsWithStart[0].ends;
      response = questionsOutput.some((element) => element === end);
    }
  });
  return response;
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
  await AsyncStorage.mergeItem(email, JSON.stringify(newData));
  const user = await AsyncStorage.getItem(email);
};

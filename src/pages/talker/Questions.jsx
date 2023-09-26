import React, {useState, useContext} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {styles, palette} from '../../styles/styles';
import {DefaultQuestions} from '../../content/DefaultQuestions';
import * as Speech from 'expo-speech';

import {ProfileContext} from '../../../global';
import {addQuestion, deleteQuestion, searchQuestion} from '../../_helpers/ProfileContent';
import { SafeAreaView } from 'react-native-safe-area-context';


/**
 * Método para renderizar página de Preguntas.
 * @return {JSX.Element}
 */
export function Questions({navigation}) {
  const [activeProfile, setProfile] = useContext(ProfileContext);
  let profile = '{}';
  if (activeProfile !== '{}') {
    profile = JSON.parse(activeProfile);
  }
  
  const goToEnd = async (start) => {
    navigation.navigate('QuestionEnd', {
      itemId: 1,
      start: start,
    });
  }

  const questions = DefaultQuestions.questions.data;
  const buttons = questions.map((question, index)=>
      <TouchableOpacity key={index} style={questionStyles.button} onPress={() => {
        goToEnd(question.start);
      }
      }>
        <View>
          <Text style={questionStyles.buttonText}> {question.start + '...'} </Text>
        </View>
      </TouchableOpacity>,
    );

  return (
<View style={{ flex: 1 }}>
  <View style={{ flex: 1, flexDirection: 'row'}}>
    <TouchableOpacity
      style={questionStyles.button}
      onPress={() => {goToEnd('¿Cómo')}} 
    >
      <Text style={questionStyles.buttonText}>¿Cómo...</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={questionStyles.button}
      onPress={() => {goToEnd('¿Qué')}}
    >
      <Text style={questionStyles.buttonText}>¿Qué...</Text>
    </TouchableOpacity>
  </View>
  <View style={{ flex: 1, flexDirection: 'row'}}>
    <TouchableOpacity
      style={questionStyles.button}
      onPress={() => {goToEnd('¿Cuándo')}}
    >
      <Text style={questionStyles.buttonText}>¿Cuándo...</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={questionStyles.button}
      onPress={() => {goToEnd('¿Dónde')}}
    >
      <Text style={questionStyles.buttonText}>¿Dónde...</Text>
    </TouchableOpacity>
  </View>
  <View style={{ flex: 1, flexDirection: 'row'}}>
    <TouchableOpacity
      style={questionStyles.button}
      onPress={() => {goToEnd('¿Quién')}}
    >
      <Text style={questionStyles.buttonText}>¿Quién...</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={questionStyles.button}
      onPress={() => {goToEnd('¿')}}
    >
      <Text style={questionStyles.buttonText}>¿...</Text>
    </TouchableOpacity>
  </View>
</View>
  );
}

export const questionStyles = StyleSheet.create({
  pageView: {
    flex: 1,
  },
  button: {
    flex: 1,
    backgroundColor: palette.violet,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  }
});

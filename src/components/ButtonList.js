import React from 'react';
import {View, Text} from 'react-native';
import Button from './Button';
import {styles} from '../styles/styles';

/**
 * Método para renderizar lista de TABs del usuario
 * @return {JSX.Element}
 */
export default function ButtonList() {
  const list = [{title: '¿Qué tal?'}, {title: '¿Qué hacemos?'}, {title: 'Si/No'}];
  const buttonlist = list.map((value) => <Button color='purple' onPress={() => openChange('name')} label={value.title}/>);
  return (
    <>
      {buttonlist}
    </>
  );
}

// <Button color='purple' onPress={() => openChange('name')} label={value} />

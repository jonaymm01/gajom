import React, {ReactNode} from 'react';
import ButtonList from './ButtonList';
import {palette} from '../styles/styles';


/**
 * Método para renderizar lista de botones
 * @return {JSX.Element}
 */
export default function TapList({...props}) {
  if (typeof(props.children) === 'string') {
    const taps = JSON.parse(props.children);
    const list = taps.data;
    return (
      <ButtonList navigation={props.navigation} list={list.reverse()} color={palette.violet}/>
    );
  }
}

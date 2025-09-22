import React, {ReactNode} from 'react';
import TapButtonList from './TapButtonList';
import {palette} from '../styles/styles';

/**
 * Método para renderizar lista de botones
 * @return {JSX.Element}
 */
export default function TapList({...props}) {
  if (typeof props.children === 'string') {
    const taps = JSON.parse(props.children);
    const list = taps.data;
    return (
      <TapButtonList
        navigation={props.navigation}
        removable={props.removable}
        list={list.reverse()}
        color={palette.violet}
      />
    );
  }
}

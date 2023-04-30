import React, {ReactNode} from 'react';
import TOList from './TOList';


/**
 * Método para renderizar un TAP
 * @return {JSX.Element}
 */
export default function TapRender({...props}) {
  if (typeof(props.children) === 'string') {
    const taps = JSON.parse(props.children);
    const list = taps.options;
    return (
      <TOList list={list}/>
    );
  }
}

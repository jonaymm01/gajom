import React, {ReactNode} from 'react';
import Button from './Button';


/**
 * Método para renderizar lista de botones
 * @return {JSX.Element}
 */
export default function ButtonList({...props}) {
  /**
   * Método para redirigir un TAP en formato JSON al creador de Taps
   * @param {JSON} tap
   */
  const makeTap = (tap) => {
    const tapString = JSON.stringify(tap);
    props.navigation.navigate(
        'Tap',
        {tapString},
    );
  };

  const buttonlist = props.list.map((tap) => <Button color={props.color} onPress={() => {
    makeTap(tap);
  }} label={tap.text}/>);
  return (
    <>
      {buttonlist}
    </>
  );
}

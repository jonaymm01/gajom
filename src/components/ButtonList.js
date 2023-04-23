import React, {ReactNode} from 'react';
import Button from './Button';

/**
 * Método para renderizar lista de botones
 * @return {JSX.Element}
 */
export default function ButtonList({...props}) {
  const buttonlist = props.list.map((value) => <Button color={props.color} onPress={() => {}} label={value.text}/>);
  return (
    <>
      {buttonlist}
    </>
  );
}

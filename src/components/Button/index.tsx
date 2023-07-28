import { ComponentProps } from 'react';
import { ButtonStyled } from './styles';

type ButtonProps = ComponentProps<'button'>

export function Button(props:ButtonProps){
  return <ButtonStyled {...props} />
}
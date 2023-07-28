import { ComponentProps } from 'react';
import { InputContainer, InputStyled, InputLabel } from './styles';

interface IInput extends ComponentProps<'input'>{
  label:string
}

export function Input({label,...props}:IInput){
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputStyled {...props} />
    </InputContainer>
  )
}
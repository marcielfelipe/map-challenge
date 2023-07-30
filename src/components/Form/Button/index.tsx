import { ComponentProps } from 'react';
import { ButtonStyled } from './styles';

export interface IButton extends ComponentProps<'button'>{
  variant?: 'outlined'|'contained'
}

export function Button({variant='contained', ...props}:IButton){
  return <ButtonStyled variant={variant} {...props} />
}
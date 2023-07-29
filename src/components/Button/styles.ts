import { styled } from 'styled-components';
import { IButton } from '.';

export const ButtonStyled = styled.button<IButton>`
  background-color: ${props =>props.variant==='outlined'? props.theme.white:props.theme.primary};
  color: ${props =>props.variant==='outlined'? props.theme.primary:props.theme.white};
  border-color:${props =>props.theme.primary};
  border-style: solid;
  padding-inline: 1rem;
  padding-block: .5rem;
  border-radius: 2rem;
  width: 100%;
  cursor: pointer;
  &:hover{
    filter:brightness(0.9);
    transition: .2s;
  }
`;
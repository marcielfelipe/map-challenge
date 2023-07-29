import { styled } from 'styled-components';
import { IInput } from '.';


export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const InputLabel = styled.label`
  padding-left: .8rem;
  padding-bottom: .5rem;
  font-size: .8rem;
`
export const InputError = styled.span`
  color: ${props =>props.theme.error};
  font-size: small;
  padding-left: .8rem;
  padding-top: 0.2rem;
`

export const InputStyled = styled.input<IInput>`
  height: 2rem;
  padding: 1rem;
  border: 1px solid ${props =>props.theme.primary};
  border-color: ${props =>props.errors[props.name]?.message?props.theme.error:props.theme.primary};
  border-radius: 1rem;
`;
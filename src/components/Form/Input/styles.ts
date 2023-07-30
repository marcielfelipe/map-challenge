import { styled } from 'styled-components';
import { IInput, IInputLabel } from '.';


export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const InputLabel = styled.label<IInputLabel>`
  padding-left: .8rem;
  padding-bottom: .5rem;
  font-size: .8rem;
  color: ${props =>props.error?props.theme.error:props.theme.black};
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
  border-color: ${props =>props?.error?.message?props.theme.error:props.theme.primary};
  border-radius: 1rem;
`;
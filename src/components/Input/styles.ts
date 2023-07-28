import { styled } from 'styled-components';


export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputLabel = styled.label`
  padding-left: .5rem;
`

export const InputStyled = styled.input`
  height: 2rem;
  padding: 1rem;
  border: 1px solid ${props =>props.theme.primary};
  border-radius: 1rem;
`;
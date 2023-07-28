import { styled } from 'styled-components';


export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap:.5rem ;
`

export const InputLabel = styled.label`
  padding-left: .8rem;
`

export const InputStyled = styled.input`
  height: 2rem;
  padding: 1rem;
  border: 1px solid ${props =>props.theme.primary};
  border-radius: 1rem;
`;
import { styled } from 'styled-components';

export const ButtonStyled = styled.button`
  background-color: ${props =>props.theme.primary};
  color: ${props =>props.theme.white};
  border: none;
  padding-inline: 1rem;
  padding-block: .5rem;
  border-radius: 2rem;
  width: 100%;
`;
import { styled } from 'styled-components';

export const ButtonStyled = styled.button`
  background-color: ${props =>props.theme.primary};
  border: none;
  padding-inline: 1rem;
  padding-block: .5rem;
  border-radius: 2ch
`;
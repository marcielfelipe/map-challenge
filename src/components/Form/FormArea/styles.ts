import { styled } from 'styled-components';

export const FormContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius:2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
export const FormGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: .7rem;
  height: 85%;
`
export const FormFooter = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
  align-items: end;
`
export const TextField = styled.input`
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius:2rem;
  padding: 1.5rem;
`

export const Title = styled.h3`

`

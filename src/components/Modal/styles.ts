import { styled } from 'styled-components';
import Modal from 'styled-react-modal'

export const ModalContent = styled.div`
  background-color: red;
  width: 500px;
  height: 400px;
`


export const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  z-index: 3;
`
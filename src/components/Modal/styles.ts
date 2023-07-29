import Modal from 'styled-react-modal'

export const StyledModal = Modal.styled`
  width:40rem;
  max-width: 90vw;
  height: 32rem;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  @media (max-width: 550px) {
    height:43rem;
  }
`
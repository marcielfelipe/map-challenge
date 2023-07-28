import React from 'react';
import { useDialog } from '@/contexts/dialog';
import { StyledModal } from './styles';


function ModalComponent() {
  const dialog = useDialog()
  return (
    <StyledModal
      isOpen={dialog?.isOpen}
      onBackgroundClick={dialog?.close}
      onEscapeKeydown={dialog?.close}
      >
      {dialog?.element}
    </StyledModal>
  );
};

export default ModalComponent;
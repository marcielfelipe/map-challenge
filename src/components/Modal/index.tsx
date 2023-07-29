import React from 'react';
import { useDialog } from '@/contexts/dialog';
import { StyledModal } from './styles';


export default function ModalComponent() {
  const dialog = useDialog()
  return (
    <StyledModal
      isOpen={dialog?.isOpen}
      >
      {dialog?.element}
    </StyledModal>
  );
};

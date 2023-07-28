import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IDialogItem {
  element: ReactNode;
  onClose?(any: any): void | Promise<void>;
}
interface IDialogContext{
  isOpen: boolean
  open:(dialog:IDialogItem)=>void
  close:()=>void
  element: ReactNode
}

// context
const DialogContext = createContext<IDialogContext|undefined>(undefined);

// Provider
const DialogProvider = ({ children }:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [element,setElement] = useState<ReactNode>()

  function open(dialog:IDialogItem){
    setElement(dialog.element)
    setIsOpen(true);

  }
  function close(){
    setIsOpen(false)
  }

  return (
    <DialogContext.Provider
      value={{ isOpen, open, close,element }}
    >
      {children}
    </DialogContext.Provider>
  );
};

const useDialog = () => {
  const context = useContext(DialogContext);
  return context;
};

export { useDialog, DialogProvider };
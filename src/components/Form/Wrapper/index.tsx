import { FormProvider, FormProviderProps } from 'react-hook-form';

export function Wrapper({children, ...props}:FormProviderProps){
  return <FormProvider {...props}>{children}</FormProvider>;
  
}
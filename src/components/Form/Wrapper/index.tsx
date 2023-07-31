import { FormProvider, FormProviderProps } from 'react-hook-form';

export const Wrapper: React.FC<FormProviderProps<any, any>> = ({
  children,
  ...props
}) => {
  return <FormProvider {...props}>{children}</FormProvider>;
};
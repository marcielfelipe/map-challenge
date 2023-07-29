import { ComponentProps } from "react";
import { InputContainer, InputStyled, InputLabel, InputError } from "./styles";

export interface IInput extends ComponentProps<"input"> {
  label?: string;
  name: string;
  errors: any;
  register: any;
}

export function Input({ label, name, errors, register, ...props }: IInput) {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputStyled errors={errors} name={name} {...register(name)} {...props} />
      {errors && <InputError>{errors[name]?.message}</InputError>}
    </InputContainer>
  );
}

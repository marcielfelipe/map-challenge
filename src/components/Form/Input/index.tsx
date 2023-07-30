import React, { ComponentProps } from "react";
import { InputContainer, InputStyled, InputLabel, InputError } from "./styles";
import { Controller,useFormContext } from "react-hook-form";
import get from "lodash/get";

export interface IInput extends ComponentProps<"input"> {
  label?: string;
  error?:any
  name: string;
}
export interface IInputLabel extends ComponentProps<"label"> {
  error?:any
}

export function Input({ label, name, ...props }:IInput ){
    
  const { formState, control } = useFormContext();

  const error = get(formState.errors, name);

  return(
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <InputContainer>
          {label && <InputLabel error={!!error}>{label}</InputLabel>}
          <InputStyled
            {...props}
            error={error}
            name={name}
            required={String(error?.type) === 'required'}
            value={field.value??''}
            onBlur={field.onBlur}
            onChange={event => {
              field.onChange({
                ...event,
                target: {
                  ...event.target,
                  value:
                    event.target.value === '' ? null : event.target.value,
                },
              });
            }}
            ref={props.ref}
          />
          {error && <InputError>{label} é obrigatório</InputError>}
        </InputContainer>
      )}
    ></Controller>
  )
}


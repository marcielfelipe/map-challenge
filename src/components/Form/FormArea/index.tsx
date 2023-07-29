import { Input } from "@/components/Input";
import { Form, FormContainer, FormFooter, FormGroup, Title } from "./styles";
import { Button } from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDialog } from "@/contexts/dialog";

interface IFormArea {
  defaultValues?: CreateAreaSchemaOutput;
  reference:number
  title: string;
  type:'create'|'view'
}

const createAreaSchema = z.object({
  name: z.string({
    required_error: "Obrigatório",
    invalid_type_error: "Insira um dado válido",
  }),
  street: z.string({
    required_error: "Obrigatório",
    invalid_type_error: "Insira um dado  válido",
  }),
  district: z.string({
    required_error: "Obrigatório",
    invalid_type_error: "Insira um dado válido",
  }),
  city: z.string({
    required_error: "Obrigatório",
    invalid_type_error: "Insira um dado válido",
  }),
  state: z.string({
    required_error: "Obrigatório",
    invalid_type_error: "Insira um dado válido",
  }),
  country: z.string({
    required_error: "Obrigatório",
    invalid_type_error: "Insira um dado válido",
  }),
  drawId: z.number().optional()
});

export type CreateAreaSchemaOutput = z.infer<typeof createAreaSchema>;

export function FormArea({ title, defaultValues,reference,type }: IFormArea) {
  const dialog = useDialog();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateAreaSchemaOutput>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    resolver: zodResolver(createAreaSchema),
    defaultValues:{
      drawId:reference,
      ...defaultValues
    },
  });

  const onSubmit: SubmitHandler<CreateAreaSchemaOutput> = (data) => {
    const createAreaParsed = createAreaSchema.parse(data);
    const areas: CreateAreaSchemaOutput[] = JSON.parse(localStorage.getItem("@map-challenge:areas") ?? "[]")
    areas.push(createAreaParsed);
    localStorage.setItem("@map-challenge:areas", JSON.stringify(areas));
    reset()
    dialog?.close()
  };

  return (
    <FormContainer>
      <Title>{title}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          errors={errors}
          label="Nome"
          id="name"
          name="name"
          type="text"
          placeholder="Nome do proprietário"
          register={register}
          required
        />
        <Input
          errors={errors}
          label="Rua"
          id="street"
          name="street"
          register={register}
          type="text"
          placeholder="Rua"
          required
        />
        <FormGroup>
          <Input
            errors={errors}
            label="Bairro"
            id="district"
            name="district"
            type="text"
            register={register}
            placeholder="Bairro"
            required
          />
          <Input
            errors={errors}
            label="Cidade"
            id="city"
            name="city"
            type="text"
            register={register}
            placeholder="Cidade"
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            errors={errors}
            label="Estado"
            id="state"
            name="state"
            type="text"
            register={register}
            placeholder="Estado"
            required
          />
          <Input
            errors={errors}
            label="País"
            id="country"
            name="country"
            type="text"
            register={register}
            placeholder="País"
            required
          />
        </FormGroup>
        {
          type === 'view'?
            <FormFooter>
              <Button
                type="button"
                onClick={() => dialog?.close()}
                variant="outlined"
              >
                Voltar
              </Button>
            </FormFooter>
          :
            <FormFooter>
              <Button type="submit">Salvar</Button>
            </FormFooter>
        }
      </Form>
    </FormContainer>
  );
}

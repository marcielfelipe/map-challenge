import {
  FormContainer,
  Container,
  FormFooter,
  FormGroup,
  Title,
} from "./styles";
import * as Form from "../Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDialog } from "@/contexts/dialog";

export interface IDefaultValues {
  name?: string;
  nameArea?: string;
  street?: string;
  district?: string;
  city?: string;
  state?: string;
  country?: string;
  drawId?: number | undefined;
}

interface IFormArea {
  defaultValues?: IDefaultValues;
  reference: number;
  title: string;
  type: "create" | "view";
}

const createAreaSchema = z.object({
  nameArea: z.string(),
  name: z.string(),
  street: z.string(),
  district: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  drawId: z.number().optional(),
});

export type CreateAreaSchemaOutput = z.infer<typeof createAreaSchema>;

export function FormArea({ title, defaultValues, reference, type }: IFormArea) {
  const dialog = useDialog();
  const form = useForm<CreateAreaSchemaOutput>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    resolver: zodResolver(createAreaSchema),
    defaultValues: {
      drawId: reference,
      ...defaultValues,
    },
  });

  const onSubmit: SubmitHandler<CreateAreaSchemaOutput> = (data) => {
    const createAreaParsed = createAreaSchema.parse(data);
    var areas: CreateAreaSchemaOutput[] = JSON.parse(
      localStorage.getItem("@map-challenge:areas") ?? "[]"
    );

    if (areas.find((a) => a.drawId === createAreaParsed.drawId)) {
      areas.map((area) => {
        if (area.drawId === createAreaParsed.drawId) {
          area.nameArea = createAreaParsed.nameArea;
          area.name = createAreaParsed.name;
          area.street = createAreaParsed.street;
          area.district = createAreaParsed.district;
          area.city = createAreaParsed.city;
          area.state = createAreaParsed.state;
          area.country = createAreaParsed.country;
        }
      });
    } else {
      areas.push(createAreaParsed);
    }
    localStorage.setItem("@map-challenge:areas", JSON.stringify(areas));
    form.reset();
    dialog?.close();
  };
  return (
    <Container>
      <Title>{title}</Title>
      <Form.Wrapper {...form}>
        <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Input
            label="Nome da propriedade"
            id="nameArea"
            name="nameArea"
            type="text"
            placeholder="Nome da propriedade"
          />
          <Form.Input
            label="Nome do proprietário"
            id="name"
            name="name"
            type="text"
            placeholder="Nome do proprietário"
          />
          <Form.Input
            label="Rua"
            id="street"
            name="street"
            type="text"
            placeholder="Rua"
          />
          <FormGroup>
            <Form.Input
              label="Bairro"
              id="district"
              name="district"
              type="text"
              placeholder="Bairro"
            />
            <Form.Input
              label="Cidade"
              id="city"
              name="city"
              type="text"
              placeholder="Cidade"
            />
          </FormGroup>
          <FormGroup>
            <Form.Input
              label="Estado"
              id="state"
              name="state"
              type="text"
              placeholder="Estado"
            />
            <Form.Input
              label="País"
              id="country"
              name="country"
              type="text"
              placeholder="País"
            />
          </FormGroup>
          <FormFooter>
            <Form.Button
              type="button"
              onClick={() => dialog?.close()}
              variant="outlined"
              disabled={type === "create"}
            >
              Voltar
            </Form.Button>
            <Form.Button
              disabled={type === "view" && !form.formState.isDirty}
              type="submit"
            >
              Salvar
            </Form.Button>
          </FormFooter>
        </FormContainer>
      </Form.Wrapper>
    </Container>
  );
}

import { Input } from '@/components/Input';
import { Form, FormContainer, FormFooter, FormGroup, Title } from './styles';
import { Button } from '@/components/Button';

interface IFormArea{
  defaultValues?: any,
  title:string
}
export function FormArea({title}:IFormArea){
  return(
    <FormContainer>
      <Title>{title}</Title>
      <Form action="">
          <Input label='Nome' id='name' type="text" placeholder='Nome do proprietário' />
          <Input  label='Rua' id='street' type="text" placeholder='Rua' />
        <FormGroup>
          <Input label='Bairro' id='district' type="text" placeholder='Bairro' />
          <Input label='Cidade' id='city' type="text" placeholder='Cidade' />
        </FormGroup>
        <FormGroup>
          <Input label='Estado' id='state' type="text" placeholder='Estado' />
          <Input label='País' id='country' type="text" placeholder='País' />
        </FormGroup>
        <FormFooter>
          <Button >Voltar</Button>
          <Button type='submit'>Salvar</Button>
        </FormFooter>
      </Form>
    </FormContainer>
  )
}
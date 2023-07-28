import { Input } from '@/components/Input';
import { Form, FormContainer } from './styles';

export function FormArea(){
  return(
    <FormContainer>
      <Form action="">
        <Input label='Nome' id='name' type="text" placeholder='Nome do proprietário' />
        <Input label='Rua' id='street' type="text" placeholder='Rua' />
      </Form>
    </FormContainer>
  )
}
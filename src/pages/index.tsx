import { Button } from '@/components/Button'
import { Container } from '@/components/Container/styles'
import { FormArea } from '@/components/Form/FormArea'
import { MapContainer } from '@/components/MapContainer/styles'
import { Menu } from '@/components/Menu/styles'
import DialogDemo from '@/components/Modal'
import { useDialog } from '@/contexts/dialog'
import dynamic from 'next/dynamic'


const Map = dynamic(() => import('../components/Map'),{
  loading:()=><p>Loading...</p>,
  ssr:false
})
const MapLayer = dynamic(() => import('../components/MapLayer'),{
  loading:()=><p>Loading...</p>,
  ssr:false
})

export default function Home() {
  const dialog = useDialog()

  function openModal(){
    dialog?.open({
      element: <FormArea/>
    })
  }
  function openModalEdit(){
    dialog?.open({
      element: <p>outro modal</p>
    })
  }
  
  return (
    <>
    <DialogDemo/>
      <Container>
        <Menu>
          <Button onClick={openModal}>Salvar</Button>
          <Button onClick={openModalEdit}>Editar</Button>
        </Menu>
        <MapContainer>
          <Map/>  
        </MapContainer>
      </Container>
    </>
    
  )
}

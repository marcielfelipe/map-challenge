import { Button } from '@/components/Button'
import { Container } from '@/components/Container/styles'
import { MapContainer } from '@/components/MapContainer/styles'
import { Menu } from '@/components/Menu/styles'
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
  return (
    <>
      <Container>
        <MapContainer>
          <Map/>  
        </MapContainer>
        <MapContainer>
          <MapLayer/>
        </MapContainer>
        <Menu>
          <Button>Salvar</Button>
        </Menu>
      </Container>
    </>
    
  )
}

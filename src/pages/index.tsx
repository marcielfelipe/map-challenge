import { Container } from '@/components/Container/styles'
import { MapContainer } from '@/components/MapContainer/styles'
import Dialog from '@/components/Modal'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../components/Map'),{
  loading:()=><p>Loading...</p>,
  ssr:false
})

export default function Home() {
  
  return (
    <>
      <Dialog/>
      <Container>
        <MapContainer>
          <Map/>  
        </MapContainer>
      </Container>
    </>
    
  )
}

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../components/Map'),{
  loading:()=><p>Loading...</p>,
  ssr:false
})
const Container = dynamic(() => import('../components/Container/styles'),{
  loading:()=><p>Loading...</p>,
  ssr:false
})
const MapContainer = dynamic(() => import('../components/MapContainer/styles'),{
  loading:()=><p>Loading...</p>,
  ssr:false
})
const Dialog = dynamic(() => import('../components/Modal'),{
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

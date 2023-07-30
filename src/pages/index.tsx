import dynamic from 'next/dynamic'
import Head from 'next/head'

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
      <Head>
        <title>Map Challenge</title>
      </Head>
      <Dialog/>
      <Container>
        <MapContainer>
          <Map/>  
        </MapContainer>
      </Container>
    </>
    
  )
}

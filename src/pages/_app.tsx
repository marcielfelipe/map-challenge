import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyle } from '@/styles/global'
import { theme } from '@/styles/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import '../styles/styles.css'
import 'react-toastify/dist/ReactToastify.css';
import 'node_modules/leaflet/dist/leaflet.css'
import 'node_modules/leaflet-draw/dist/leaflet.draw.css'
import { DialogProvider } from '@/contexts/dialog'
import { ModalProvider } from 'styled-react-modal'
import { Roboto } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
 

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <title>Map Challenge</title>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>

      <ToastContainer
        draggable={false}
        autoClose={3000}
        position="top-center"
      />
      <StyledComponentsRegistry>
        <GlobalStyle/>
        <ThemeProvider theme={theme}>
          <DialogProvider>
            <ModalProvider>
              <Component {...pageProps} />
            </ModalProvider>
          </DialogProvider>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </>
  )
}

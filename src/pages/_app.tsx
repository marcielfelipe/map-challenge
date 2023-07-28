import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyle } from '@/styles/global'
import { theme } from '@/styles/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import '../styles/styles.css'
import { DialogProvider } from '@/contexts/dialog'
import { ModalProvider } from 'styled-react-modal'
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
 

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
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

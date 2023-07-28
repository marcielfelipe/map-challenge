import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyle } from '@/styles/global'
import { theme } from '@/styles/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import '../styles/styles.css'
import { DialogProvider } from '@/contexts/dialog'
import { ModalProvider } from 'styled-react-modal'


export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
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

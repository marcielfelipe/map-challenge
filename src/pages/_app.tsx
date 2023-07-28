import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyle } from '@/styles/global'
import { theme } from '@/styles/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <StyledComponentsRegistry>
        <GlobalStyle/>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledComponentsRegistry>
    </>
  )
}

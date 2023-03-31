import 'reflect-metadata'
import { AppProps } from 'next/app'
import Link from 'next/link'
import Head from 'next/head'

import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'
import '@/styles/global.scss'


const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
     <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu|Ubuntu+Condensed|Ubuntu+Mono&display=swap"
        rel="stylesheet"
      />
    </Head>
    <div>
      <Link href='/'>Top</Link>
    </div>
    <Component {...pageProps} />
  </>
)

export default App

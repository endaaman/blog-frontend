import { AppProps } from 'next/app'
import Link from 'next/link'
import Head from 'next/head'
import '@/styles/global.css'


const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
    </Head>
    <div>
      <Link href='/'>Top</Link>
    </div>
    <Component {...pageProps} />
  </>
)

export default App

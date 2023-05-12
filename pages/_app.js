import '../styles/globals.css'
import Layout from '../Components/Layout'
import { Analytics } from '@vercel/analytics/react';
import Hero from '../Components/Hero';



function MyApp({ Component, pageProps }) {
  return (

   <Layout>

      <Hero>

     
      <Component {...pageProps} />
      <Analytics />

      </Hero>

   </Layout>


  )
}

export default MyApp

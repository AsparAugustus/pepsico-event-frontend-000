import '../styles/globals.css'
import Layout from '../Components/Layout'
import { Analytics } from '@vercel/analytics/react';
import Hero from '../Components/Hero';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();



function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
   <Layout>

      <Hero>

     
      <Component {...pageProps} />
      <Analytics />

      </Hero>

   </Layout>
   </QueryClientProvider>


  )
}

export default MyApp

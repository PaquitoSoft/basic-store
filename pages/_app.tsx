import { ShopCartProvider } from '../components/shop-cart-context';
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShopCartProvider>
      <Component {...pageProps} />
    </ShopCartProvider>
  );
}

export default MyApp

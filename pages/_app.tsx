import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import { ShopCartProvider } from '../components/shop-cart-context';
import { loadShopCart } from '../stores/shop-cart.store';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadShopCart();
  }, []);
  return (
    <Component {...pageProps} />
  );
}

export default MyApp

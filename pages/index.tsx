import Head from 'next/head';
import type { NextPage } from 'next';
import { useCallback } from 'react';
import CatalogProduct from '../components/catalog-product';
import type Product from '../types/product';
import useProducts from '../hooks/use-products';
import AppHeader from '../components/app-header';
import { addToShopCart, useShopCart } from '../stores/shop-cart.store';

const Home: NextPage = () => {
  const { products } = useProducts();
  const { shopCart, isLoading } = useShopCart();

  const onAddToCart = useCallback((product: Product) => {
    addToShopCart(product.id);
  }, []);

  console.log('Rendering <HomePage />');

  return (
    <>
      <Head>
        <title>Basic Store | Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AppHeader shopCart={isLoading ? undefined : shopCart} />

        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-4xl pb-10">Catalog</h1>
          <div className="grid grid-cols-1 gap-y-40 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product: Product) => (
              <CatalogProduct
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home

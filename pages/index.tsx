import Head from 'next/head';
import type { NextPage } from 'next';
import ProductCard from '../components/product-card';
import type Product from '../types/product';
// import products from '../data/products.json';
import Link from 'next/link';
import useProducts from '../hooks/use-products';
import useShopCart from '../hooks/use-shop-cart';
import { useCallback } from 'react';
import AppHeader from '../components/app-header';

const Home: NextPage = () => {
  const { products/*, loading, error */} = useProducts();
  const { shopCart, addToShopCart } = useShopCart();

  const onAddToCart = useCallback((product: Product) => {
    addToShopCart(product.id);
  }, [addToShopCart]);

  return (
    <>
      <Head>
        <title>Basic Store | Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AppHeader shopCart={shopCart} />

        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-4xl pb-10">Catalog</h1>
          <div className="grid grid-cols-1 gap-y-40 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product: Product) => (
              <ProductCard
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

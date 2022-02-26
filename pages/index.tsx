import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import ProductCard from '../components/product-card';
// import styles from '../styles/Home.module.css'
import Product from '../types/product';
import products from '../data/products.json';

const Home: NextPage = () => {
  const addProductToCart = (product: Product) => {};

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header>
          <div className="max-w-7xl mx-auto bg-slate-600 px-4 py-6 rounded-xl">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">Basic Store</h1>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-40 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addProductToCart}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home

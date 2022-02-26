import Head from 'next/head';
import AppHeader from '../components/app-header';
import useShopCart from '../hooks/use-shop-cart';

function ShopCartView() {
  const { shopCart } = useShopCart();

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
            TBD: ShopCart items
          </div>
        </div>
      </main>
    </>
  );
}

export default ShopCartView;

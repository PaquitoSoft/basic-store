import Head from 'next/head';
import AppHeader from '../components/app-header';
import ItemsGrid from '../components/items-grid';
import ShopCartItem from '../components/shop-cart-item';
import { useShopCart } from '../components/shop-cart-context';

function ShopCartView() {
  const { shopCart, updateInShopCart, removeFromShopCart } = useShopCart();
  console.log('Rendering <ShopCartView />');
  return (
    <>
      <Head>
        <title>Basic Store | Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AppHeader shopCart={shopCart} />

        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <ItemsGrid title="ShopCart">
            {shopCart.items.map((item) => (
              <ShopCartItem
                key={item.id}
                item={item}
                onQuantityChange={updateInShopCart}
                onRemove={removeFromShopCart}
              />
            ))}
          </ItemsGrid>
        </div>
      </main>
    </>
  );
}

export default ShopCartView;

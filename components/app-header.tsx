import Link from "next/link";
import { ShopCart } from "../types/shop-cart";

type Props = {
  shopCart?: ShopCart;
};

function AppHeader({ shopCart }: Props) {
  console.log('Rendering <AppHeader /> with totalItems', shopCart ? shopCart.totalItems: '(no shop cart yet)');

  return (
    <header>
      <div className="max-w-7xl mx-auto bg-slate-600 px-4 py-6 mt-4 rounded-xl">
        <div className="flex min-w-0 justify-between">
          <Link href="/">
            <a>
              <h1 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">Basic Store</h1>
            </a>
          </Link>
          {
            shopCart ?
              <Link href="/shop-cart">
                <a className="text-xl font-bold leading-7 text-white sm:text-3xl sm:truncate">Cart ({shopCart.totalItems})</a>
              </Link>
            :
            <div className="text-lg font-bold leading-7 text-white sm:text-xl sm:truncate">loading...</div>
          }
        </div>
      </div>
    </header>
  );
}

export default AppHeader;

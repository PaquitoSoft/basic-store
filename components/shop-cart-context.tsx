import { ReactNode, createContext, useEffect, useState, useContext, useMemo } from "react";
import { get, post, put, del } from "@paquitosoft/fetcher";
import { ShopCart } from "../types/shop-cart";

type ServerData = {
  shopCart: ShopCart;
};

const ENDPOINT_URL = "/api/shop-cart";

const defaultShopCart: ShopCart = {
  id: -1,
  items: [],
  totalItems: 0,
  totalAmount: 0
};

const ShopCartContext = createContext({
  shopCart: defaultShopCart,
  updateShopCart: (_shopCart: ShopCart) => {},
});

export const ShopCartProvider = ({ children }: { children: ReactNode }) => {
  const [shopCart, setShopCart] = useState<ShopCart>(defaultShopCart);
  const context = useMemo(() => ({ shopCart, updateShopCart: setShopCart }), [shopCart]);
  console.log('Rendering ShopCartProvider with totalItems:', shopCart.totalItems);
  useEffect(() => {
    const loadShopCart = async () => {
      const data = await get<ServerData>(ENDPOINT_URL);
      console.log('Updating ShopCart from server...');
      setShopCart(data.shopCart);
      console.log('ShopCart updated from server!');
    };
    loadShopCart();
  }, []);

  return (
    <ShopCartContext.Provider value={context}>{children}</ShopCartContext.Provider>
  )
};

export function useShopCart() {
  const { shopCart, updateShopCart } = useContext(ShopCartContext);
  const [loading, setLoading] = useState(false);

  const fireRequest = async (requester: () => Promise<ServerData>) => {
    try {
      setLoading(true);
      const data = await requester();
      updateShopCart(data.shopCart);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addToShopCart = async (productId: number) => {
    fireRequest(() => post(ENDPOINT_URL, { productId }));
  };

  const updateInShopCart = (itemId: number, newQuantity: number) => {
    fireRequest(() => put(ENDPOINT_URL, { itemId, newQuantity }));
  };

  const removeFromShopCart = (itemId: number) => {
    fireRequest(() => del(ENDPOINT_URL, { body: { itemId } }));
  };

  return {
    loading,
    shopCart,
    addToShopCart,
    updateInShopCart,
    removeFromShopCart
  };
}

export default useShopCart;

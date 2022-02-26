import { get, post } from "@paquitosoft/fetcher";
import { useEffect, useState } from "react";
import { ShopCart } from "../types/shop-cart";

type ServerData = {
  shopCart: ShopCart;
};

const ENDPOINT_URL = "/api/shop-cart";

const defaultShopCart = {
  id: -1,
  items: [],
  totalItems: 0,
  totalAmount: 0
};

function useShopCart() {
  const [shopCart, setShopCart] = useState<ShopCart>(defaultShopCart);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadShopCart = async () => {
      const data = await get<ServerData>(ENDPOINT_URL);
      setShopCart(data.shopCart);
    };
    console.log('Loading shop cart...');
    loadShopCart();
  }, []);

  const addToShopCart = async (productId: number) => {
    try {
      setLoading(true);
      const data = await post<ServerData>(ENDPOINT_URL, { productId });
      setShopCart(data.shopCart);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const updateInShopCart = (itemId: number, newQuantity: number) => {};
  const removeFromShopCart = (itemId: number) => {};

  return {
    loading,
    shopCart,
    addToShopCart,
    updateInShopCart,
    removeFromShopCart
  };
}

export default useShopCart;

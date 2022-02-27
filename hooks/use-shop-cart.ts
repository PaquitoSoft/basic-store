import { get, post, put, del } from "@paquitosoft/fetcher";
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
    loadShopCart();
  }, []);

  const fireRequest = async (requester: () => Promise<ServerData>) => {
    try {
      setLoading(true);
      const data = await requester();
      setShopCart(data.shopCart);
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

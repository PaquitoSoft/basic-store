import { create } from 'zustand';
import { get, post, put, del } from "@paquitosoft/fetcher";
import type { ShopCart } from '../types/shop-cart';

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

export const useShopCart = create(() => ({
  shopCart: defaultShopCart,
  isLoading: true,
}));

const fireRequest = async (requester: () => Promise<ServerData>) => {
  try {
    useShopCart.setState(() => ({ isLoading: true }));
    const data = await requester();
    useShopCart.setState(() => ({ shopCart: data.shopCart }));
  } catch(error) {
    console.error(error);
  } finally {
    useShopCart.setState(() => ({ isLoading: false }));
  }
};

export const loadShopCart = async () => {
  console.log('Fetching shopping cart...');
  await fireRequest(() => get(ENDPOINT_URL));
  console.log('...shopping cart fetched!');
};

export const addToShopCart = async (productId: number) => {
  fireRequest(() => post(ENDPOINT_URL, { productId }));
};

export const updateInShopCart = (itemId: number, newQuantity: number) => {
  fireRequest(() => put(ENDPOINT_URL, { itemId, newQuantity }));
};

export const removeFromShopCart = (itemId: number) => {
  fireRequest(() => del(ENDPOINT_URL, { body: { itemId } }));
};

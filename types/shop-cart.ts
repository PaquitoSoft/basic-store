import Product from "./product";

export type ShopCartItem = {
  id: number;
  quantity: number;
  amount: number;
  product: Product;
};

export type ShopCart = {
  id: number;
  items: ShopCartItem[];
  totalItems: number;
  totalAmount: number;
};


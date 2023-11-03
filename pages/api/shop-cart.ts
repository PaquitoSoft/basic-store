import products from '../../public/data/products.json';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type{ ShopCart } from '../../types/shop-cart';
import { resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';

type Data = {
  shopCart: ShopCart;
} | { message: string };

// --------------- BEGIN: Helper functions ---------------
const SHOP_CART_PATH = '/api/shop-cart';
async function readShopCart(): Promise<ShopCart> {
  const filePath = resolve('./public', 'data', 'shop-cart.json');
  const data = await readFile(filePath, 'utf8');
  return JSON.parse(data);
}
async function writeShopCart(shopCart: ShopCart): Promise<ShopCart> {
  const filePath = resolve('./public', 'data', 'shop-cart.json');
  const totals = shopCart.items.reduce((acc, item) => {
    acc.items += item.quantity;
    acc.amount += item.quantity * item.product.price;
    return acc;
  }, { items: 0, amount: 0 });
  shopCart.totalItems = totals.items;
  shopCart.totalAmount = totals.amount;
  await writeFile(filePath, JSON.stringify(shopCart));
  return shopCart;
}
const wait = (timeout = 1000) => new Promise(resolve => setTimeout(resolve, timeout));
// --------------- END: Helper functions ---------------

async function getCart(req: NextApiRequest, res: NextApiResponse<Data>) {
  const shopCart = await readShopCart();
  res.status(200).json({ shopCart });
}

async function addToCart(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { productId } = req.body;
  const shopCart = await readShopCart();
  const product = products.find(p => p.id === Number(productId))!;
  const shopCartItem = shopCart.items.find(item => item.product.id === Number(productId));

  if (!shopCartItem) {
    shopCart.items.push({
      id: Date.now(),
      quantity: 1,
      amount: product.price,
      product
    });
  } else {
    shopCartItem.quantity += 1;
    shopCartItem.amount += shopCartItem.product.price;
  }

  await writeShopCart(shopCart);

  res.status(200).json({ shopCart });
}

async function updateInCart(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { itemId, newQuantity } = req.body;
  const shopCart = await readShopCart();
  const item = shopCart.items.find(item => item.id === Number(itemId));

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  item.quantity = newQuantity;
  item.amount = newQuantity * item.product.price;

  await writeShopCart(shopCart);

  res.status(200).json({ shopCart });
}

async function removeFromToCart(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { itemId } = req.body;
  const shopCart = await readShopCart();
  const itemIndex = shopCart.items.findIndex(item => item.id === Number(itemId));

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  shopCart.items.splice(itemIndex, 1);

  await writeShopCart(shopCart);

  res.status(200).json({ shopCart });
}

const handlersMap: Record<string, NextApiHandler> = {
  GET: getCart,
  POST: addToCart,
  PUT: updateInCart,
  DELETE: removeFromToCart
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const shopCartHandler = handlersMap[req.method!];

  if (shopCartHandler) {
    await wait(2000);
    return shopCartHandler(req, res);
  } else {
    throw new Error(`Unsupported method ${req.method}`);
  }
}

import products from '../../data/products.json';
import type { NextApiRequest, NextApiResponse } from 'next'
import type{ ShopCart } from '../../types/shop-cart';

type Data = {
  shopCart: ShopCart;
} | { message: string };

const shopCart: ShopCart = {
  id: Date.now(),
  items: [],
  totalItems: 0,
  totalAmount: 0
};

function getCart(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ shopCart });
}
function addToCart(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { productId } = req.body;
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

  res.status(200).json({ shopCart });
}

function updateInCart(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { itemId, newQuantity } = req.body;
  const item = shopCart.items.find(item => item.id === Number(itemId));

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  item.quantity = newQuantity;
  item.amount = newQuantity * item.product.price;

  res.status(200).json({ shopCart });
}

function removeFromToCart(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { itemId } = req.body;
  const itemIndex = shopCart.items.findIndex(item => item.id === Number(itemId));

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  shopCart.items.splice(itemIndex, 1);

  res.status(200).json({ shopCart });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      getCart(req, res);
      break;
    case 'POST':
      addToCart(req, res);
    case 'PUT':
      updateInCart(req, res);
    case 'DELETE':
      removeFromToCart(req, res);
    default:
      throw new Error(`Unsupported method ${req.method}`);
  }
}

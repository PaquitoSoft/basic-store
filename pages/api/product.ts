import products from '../../data/products.json';
import type { NextApiRequest, NextApiResponse } from 'next';
import type Product from '../../types/product';

type Data = {
  products: Product[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ products });
}

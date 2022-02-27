import { ShopCartItem } from "../types/shop-cart";
import ProductCard from "./product-card";

type Props = {
  item: ShopCartItem;
  onQuantityChange: (itemId: number, quantity: number) => void;
  onRemove: (itemId: number) => void;
};

function ShopCartItem({ item, onQuantityChange, onRemove }: Props) {
  return (
    <ProductCard product={item.product}>
      <div className="flex flex-row items-center py-4">
        <p className="mr-2 text-lg font-medium text-gray-900">{item.amount} EUR</p>
        <p className="text-xs">(<span>{item.quantity}</span> x <span className="text-sm">{item.product.price.toFixed(2)}</span>)</p>
      </div>
      <div className="flex justify-between">
        <select
          name="quantity"
          className="select select-bordered select-sm"
          defaultValue={item.quantity}
          onChange={(event) => onQuantityChange(item.id, parseInt(event.target.value))}
        >
          {
            Array(5).fill('').map((_, index) => (
              <option key={`${item.id}-${index}`} value={index + 1}>{index + 1}</option>
            ))
          }
        </select>
        <button
          className="btn btn-error btn-sm"
          onClick={() => onRemove(item.id)}
        >Remove</button>
      </div>
    </ProductCard>
  );
}

export default ShopCartItem;

import { useCallback } from "react";
import Product from "../types/product";

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

// function ProductCard({ product }: { product: Product }) {
//   return (
//     <div className="card w-96 bg-base-100 shadow-xl">
//       <figure>
//         <img src={product.image} alt={product.title} />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{product.title}</h2>
//         <p>{product.description}</p>
//         <div className="justify-end card-actions">
//           <button className="btn btn-primary">Add to cart</button>
//         </div>
//       </div>
//     </div>
//   );
// }

function ProductCard({ product, onAddToCart }: Props) {
  return (
    <div className="group">
      <div className="w-full aspect-w-1 aspect-h-1 br-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img src={product.image} alt={product.title} />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price} EUR</p>
      <button
        className="mt-4 px-4 py-2 w-full border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-500 hover:bg-slate-600 focus:outline-none"
        onClick={() => onAddToCart(product)}
      >Add to cart</button>
    </div>
  );
}

export default ProductCard;

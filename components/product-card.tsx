import Product from "../types/product";

type Props = {
  product: Product;
  children: React.ReactNode;
};

function ProductCard({ product, children }: Props) {
  return (
    <div className="group">
      <div className="w-full aspect-w-1 aspect-h-1 br-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img src={product.image} alt={product.title} />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <div>
        {children}
      </div>
    </div>
  );
}

export default ProductCard;

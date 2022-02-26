import { useEffect, useState } from "react";
import { get } from "@paquitosoft/fetcher";
import Product from "../types/product";

type ServerData = {
  products: Product[];
};

const ENDPOINT_URL = "/api/product";

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await get<ServerData>(ENDPOINT_URL, { ttl: 60 });
        setProducts(data.products);
      } catch(error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export default useProducts;

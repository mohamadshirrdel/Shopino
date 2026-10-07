import { useEffect, useState } from "react";
import { getAllProducts } from "./../../services/product.service";

export const useProducts = (limit = 10) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setIsLoading(true);
    setError("");

    setTimeout(async () => {
      try {
        const res = await getAllProducts({ page, limit });
        setProducts(res?.data?.products || []);
        setPagination(res?.data?.pagination || null);
      } catch (error) {
        setError("خطا در دریافت محصولات");
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  return {
    products,
    pagination,
    page,
    setPage,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};

import { useState, useEffect } from "react";
import { getAllCategories } from "./../../services/category.service.js";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const res = await getAllCategories();

      setCategories(res?.data?.categories || []);
    } catch (err) {
      setError("خطا در دریافت دسته‌بندی‌ها");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { categories, isLoading, refetch: fetchData, error };
};

export default useCategories;

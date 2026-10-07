import { useEffect, useState } from "react";
import { getAllSubCategories } from "../../services/category.service";

const useSubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const res = await getAllSubCategories();

      console.log("SUB CATEGORIES:", res);
      console.log("FIRST SUB CATEGORY:", res?.data?.categories?.[0]);

      setSubCategories(res?.data?.categories || []);
    } catch (err) {
      setError("خطا در دریافت زیردسته‌بندی‌ها");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { subCategories, isLoading, refetch: fetchData, error };
};

export default useSubCategories;

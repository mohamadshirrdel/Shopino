import { useState } from "react";
import {
  createSubCategory,
  updateSubCategory,
} from "../../services/category.service";

const useSubCategoryForm = (onSuccess) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async ({
    subCategoryId,
    title,
    slug,
    description,
    parent,
    filters,
  }) => {
    setIsSubmitting(true);
    setError("");

    try {
      if (subCategoryId) {
        const updateData = {
          title,
          slug,
          description,
          parent,
          filters,
        };

        console.log("UPDATE SUB CATEGORY:", updateData);

        await updateSubCategory(subCategoryId, updateData);
      } else {
        const createData = {
          title,
          slug,
          description,
          parent,
          filters,
        };

        console.log("CREATE SUB CATEGORY:", createData);

        await createSubCategory(createData);
      }

      onSuccess();
    } catch (err) {
      console.log("SUB CATEGORY ERROR FULL:", err);

      setError(
        err?.response?.data?.message ||
          (subCategoryId
            ? "خطا در ویرایش زیردسته‌بندی"
            : "خطا در ایجاد زیردسته‌بندی"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    error,
    isSubmitting,
    submit,
  };
};

export default useSubCategoryForm;

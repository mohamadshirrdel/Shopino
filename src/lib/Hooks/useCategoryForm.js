import { useState } from "react";
import {
  createCategory,
  updateCategory,
} from "../../services/category.service";

export const useCategoryForm = (onSuccess) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async ({
    categoryId,
    title,
    slug,
    description,
    iconFile,
    filters,
  }) => {
    setIsSubmitting(true);
    setError("");

    try {
      if (categoryId) {
        const updateData = {
          title,
          slug,
          description,
          filters,
        };
        console.log("UPDATE CATEGORY:", updateData);

        await updateCategory(categoryId, updateData);
      } else {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("filters", JSON.stringify(filters));
        if (iconFile) {
          formData.append("iconFile", iconFile);
        }
        await createCategory(formData);
      }
      onSuccess();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          (categoryId ? "خطا در ویرایش دسته‌بندی" : "خطا در ایجاد دسته‌بندی"),
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

import { useState } from "react";
import { createComment } from "./../../services/comment.service";

export const useCommentForm = (productId, onSuccess) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async ({ content, rating }) => {
    setIsSubmitting(true);
    setError("");

    try {
      await createComment({ content, rating, productId });
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || "خطا در ثبت کامنت");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { error, isSubmitting, submit };
};

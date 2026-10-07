import { useEffect, useState } from "react";
import { getProductComments } from "../../services/comment.service";

export const useProductComments = (productId) => {
  const [comments, setComments] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = async (cursor) => {
    const isLoadMore = Boolean(cursor);

    if (isLoadMore) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    setError("");

    try {
      const response = await getProductComments(productId, 3, cursor);

      const newComments = response?.data?.comments || [];

      const pagination = response?.data?.pagination;

      setComments((prevComments) =>
        isLoadMore ? [...prevComments, ...newComments] : newComments,
      );

      setNextCursor(pagination?.nextCursor);
      setHasNextPage(pagination?.hasNextPage);
    } catch (err) {
      setError(
        isLoadMore ? "خطا در دریافت کامنت های بیشتر" : "خطا در دریافت کامنت‌ها",
      );
    } finally {
      if (isLoadMore) {
        setIsLoadingMore(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const loadMoreComments = () => {
    if (!hasNextPage || isLoadingMore || !nextCursor) {
      return;
    }

    fetchComments(nextCursor);
  };

  useEffect(() => {
    if (productId) {
      fetchComments();
    }
  }, [productId]);

  return {
    comments,
    isLoading,
    isLoadingMore,
    error,
    hasNextPage,
    loadMoreComments,
  };
};

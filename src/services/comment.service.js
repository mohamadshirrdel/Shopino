import api from "./api";

export const createComment = async (comment) => {
  const { data } = await api.post("/comments", comment);

  return data;
};

export const getProductComments = async (
  productId,
  limit = 3,
  cursor = null,
) => {
  const params = new URLSearchParams({
    productId,
    limit: String(limit),
  });

  if (cursor) {
    params.append("cursor", cursor);
  }

  const { data } = await api.get(`/comments?${params.toString()}`);

  return data;
};

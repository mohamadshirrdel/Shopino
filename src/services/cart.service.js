import api from "./api";

export const addToServerCart = async (body) => {
  const { data } = await api.post("/cart/add", body);

  return data;
};

export const getServerCart = async () => {
  const { data } = await api.get("/cart");

  return data;
};

export const updateServerCartItem = async (body) => {
  const { data } = await api.patch("/cart/update", body);

  return data;
};

export const removeServerCartItem = async (body) => {
  const { data } = await api.post("/cart/remove", body);

  return data;
};

import api from "./api";

export const getAllUsers = async (params) => {
  const { data } = await api.get("/users", { params });

  return data;
};

export const banUser = async (id) => {
  const { data } = await api.post(`/users/ban/${id}`);

  return data;
};

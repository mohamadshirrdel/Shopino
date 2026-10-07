import api from "./api";

// Categories
export const getAllCategories = async () => {
  const { data } = await api.get("/category");

  return data;
};

export const createCategory = async (formData) => {
  const { data } = await api.post("/category", formData);

  return data;
};

export const updateCategory = async (id, payload) => {
  const { data } = await api.put(`/category/${id}`, payload);

  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/category/${id}`);

  return data;
};

// SubCategories
export const getAllSubCategories = async () => {
  const { data } = await api.get("/category/sub");

  return data;
};

export const createSubCategory = async (formData) => {
  const { data } = await api.post("/category/sub", formData);

  return data;
};

export const updateSubCategory = async (id, formData) => {
  const { data } = await api.put(`/category/sub/${id}`, formData);

  return data;
};

export const removeSubCategory = async (id) => {
  const { data } = await api.delete(`/category/sub/${id}`);

  return data;
};

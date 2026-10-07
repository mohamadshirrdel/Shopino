import api from "./api";

const createProduct = async (formData) => {
  try {
    const { data } = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllProducts = async (params) => {
  const { data } = await api.get("/products", { params });

  return data;
};

export const getOneProduct = async (slug) => {
  const { data } = await api.get(`/products/${slug}`);

  return data;
};

export const removeProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);

  return data;
};

export default createProduct;

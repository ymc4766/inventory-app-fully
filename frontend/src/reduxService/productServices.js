import axios from "axios";
import { CATEGORY_URL, PRODUCTS_URL, UOM_URL } from "../redux/constants";

export const getProductService = async (id) => {
  const response = await axios.get(`${PRODUCTS_URL}/${id}`);

  return response.data;
};

export const createProductService = async (formData) => {
  const response = await axios.post(`${PRODUCTS_URL}/create`, formData);

  return response.data;
};

export const updateProductService = async (id, formData) => {
  const response = await axios.put(`${PRODUCTS_URL}/${id}`, formData);

  return response.data;
};

export const deleteProductService = async (id) => {
  const response = await axios.delete(`${PRODUCTS_URL}/${id}`);

  return response.data;
};
export const createCategoryService = async (formData) => {
  const response = await axios.post(`${CATEGORY_URL}/create`, formData);

  return response.data;
};

export const getCategoryService = async () => {
  const response = await axios.get(CATEGORY_URL);

  return response.data;
};

export const getUomService = async () => {
  const response = await axios.get(UOM_URL);
  return response.data;
};

export const createUomService = async (formData) => {
  const response = await axios.post(UOM_URL, formData);
  return response.data;
};

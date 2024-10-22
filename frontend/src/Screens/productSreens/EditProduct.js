import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getProduct,
  resetStatus,
  updateProduct,
} from "../../redux/productSlice";
import { getCategories, getUoms } from "../../redux/categorySlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    location: "",
    manufacturer: "",
    supplier: "",
    uom: "",
  });

  const { product, isLoading, isError } = useSelector(
    (state) => state.products
  );

  const { categories, Uom } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        manufacturer: product.manufacturer,
        stock: product.stock,
        location: product.location,
        supplier: product.supplier,
        uom: product.uom,
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      stock: parseInt(formData.stock),
    };

    dispatch(updateProduct({ id, formData: updatedData }));
    navigate("/dashboard");
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(getUoms());
  }, []);

  return (
    <div className="edit-product bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          >
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Supplier</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Manufacturer</label>
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">UOM</label>
          <select
            name="uom"
            value={formData.uom}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          >
            {Uom &&
              Uom.map((uom) => (
                <option key={uom._id} value={uom.title}>
                  {uom.title}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

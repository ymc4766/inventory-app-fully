import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Warehouse = () => {
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState(""); // State for search input

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Inventory Rendered Successfully");
    }
    dispatch(getProducts());
  }, [dispatch, isSuccess]);

  // Filter products based on search input
  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.supplier?.toLowerCase().includes(search.toLowerCase()) ||
      product.modalNo?.toLowerCase().includes(search.toLowerCase()) ||
      product.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
      product.uom?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-list w-full mt-8 px-6">
      <div className="flex items-center justify-between mb-2">
        <input
          type="text"
          placeholder="Search by Name, Category, Supplier, etc."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-[60%] text-slate-800"
        />
        <h1 className="">LIST INVENTORY</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200"></div>
        </div>
      ) : isError ? (
        <p>{message}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-slate-200 text-gray-800 px-4 p-2 py-3">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-3 border">NAME</th>
                <th className="py-2 px-3 border">CATEGORY</th>
                <th className="py-2 px-3 border">SUPPLIER</th>
                <th className="py-2 px-3 border">STOCK</th>
                <th className="py-2 px-3 border">MODEL NO</th>
                <th className="py-2 px-3 border">MANUFACTURER</th>
                <th className="py-2 px-3 border">UOM</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">{product.category}</td>
                  <td className="py-2 px-4 border">
                    {product.supplier ? product.supplier : "N/A"}
                  </td>
                  <td className="py-2 px-4 border">{product.stock}</td>
                  <td className="py-2 px-4 border">
                    {product.modalNo ? product.modalNo : "N/A"}
                  </td>
                  <td className="py-2 px-4 border">{product.manufacturer}</td>
                  <td className="py-2 px-4 border">
                    {product.uom ? product.uom : "PCS"}
                  </td>
                  <td>
                    <Link to={`/product/${product._id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Warehouse;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate"; // Import react-paginate
import { deleteProduct, getProducts } from "../redux/productSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CategoryModal from "../components/CategoryModal";
import { getCategories, getUoms } from "../redux/categorySlice";
import CreateProduct from "./productSreens/CreateProduct";
import UOmModal from "../components/UOmModal";
import { RiDeleteBin7Fill } from "react-icons/ri";

const Dashboard = () => {
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const { categories, Uom } = useSelector((state) => state.category);

  const [categoryModal, setOpenCategoryModal] = useState(false);
  const [uomModal, setOpenUomModal] = useState(false);
  const [productModal, setOpenProductModal] = useState(false);
  const [search, setSearch] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const [productsPerPage] = useState(6); // Number of products per page

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteProductHandler = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getProducts());
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUoms());
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(getProducts());
  }, [dispatch, userInfo, navigate]);

  const openCategoryModal = () => setOpenCategoryModal(true);
  const closeCategoryModal = () => setOpenCategoryModal(false);
  const openProductModalHanlder = () => setOpenProductModal(true);
  const closeProductModal = () => setOpenProductModal(false);
  const openUomMOdal = () => setOpenUomModal(true);
  const closeUomModal = () => setOpenUomModal(false);

  // Filter products based on search input
  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.modalNo?.toLowerCase().includes(search.toLowerCase()) ||
      product.uom?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(
    offset,
    offset + productsPerPage
  );
  const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="w-full mt-8 px-4">
      {categoryModal && <CategoryModal onClose={closeCategoryModal} />}
      {productModal && <CreateProduct onClose={closeProductModal} />}
      {uomModal && <UOmModal onClose={closeUomModal} />}
      <div>
        <div className="flex items-center space-x-3">
          <button
            onClick={openCategoryModal}
            className="px-6 bg-orange-600 p-2 rounded-3xl flex flex-col"
          >
            ADD CATEGORY
            <span className="m-auto text-lg">
              {categories && categories?.length}
            </span>
          </button>

          <button
            onClick={openProductModalHanlder}
            disabled={userInfo && !userInfo.isAdmin}
            className="px-6 bg-gray-400 p-2 rounded-3xl flex flex-col"
          >
            ADD PRODUCT
            <span className="m-auto text-lg">
              {products && products?.length}
            </span>
          </button>

          <button
            onClick={openUomMOdal}
            disabled={userInfo && !userInfo.isAdmin}
            className="px-6 bg-blue-600 p-2 rounded-3xl flex flex-col"
          >
            ADD UOM
            <span className="m-auto text-lg">{Uom && Uom?.length}</span>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between py-3 mb-2">
        <input
          type="text"
          placeholder="Search by Name, ModelNo, or UOM"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-[60%] text-slate-800"
        />
        {/* <h1 className="">LIST INVENTORY</h1> */}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32  w-32 border-t-2 border-b-2 border-gray-200"></div>
        </div>
      ) : isError ? (
        <p>{message}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-200 text-gray-800">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-3 border">NAME</th>
                  <th className="py-2 px-3 border">CATEGORY</th>
                  <th className="py-2 px-3 border">SUPPLIER </th>
                  <th className="py-2 px-3 border">STOCK </th>
                  <th className="py-2 px-3 border">MODEL NO</th>
                  <th className="py-2 px-3 border">MANUFACTURER</th>
                  <th className="py-2 px-3 border">UOM</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map((product) => (
                  <tr key={product._id}>
                    <td className="py-2 px-4 border">{product?.name}</td>
                    <td className="py-2 px-4 border">{product?.category}</td>
                    <td className="py-2 px-4 border">{product?.supplier}</td>

                    <td className="py-2 px-4 border">{product?.stock}</td>
                    <td className="py-2 px-4 border">
                      {product?.modalNo ? product.modalNo : "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {product?.manufacturer}
                    </td>
                    <td className="py-2 px-4 border">
                      {product?.uom ? product.uom : "PCS"}
                    </td>
                    <td>
                      <button className="px-4 p-2 bg-slate-300 text-black mr-4 rounded-2xl">
                        <Link to={`/edit/${product._id}`}>Edit</Link>
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="px-4 p-2 bg-slate-300 text-black mr-4 rounded-2xl"
                      >
                        <RiDeleteBin7Fill size={22} className="" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center mt-4 space-x-2"}
            pageClassName={"px-3 py-1 border rounded"}
            previousClassName={"px-3 py-1 border rounded"}
            nextClassName={"px-3 py-1 border rounded"}
            activeClassName={"bg-gray-200"}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;

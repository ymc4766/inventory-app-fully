import { Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories, getUoms } from "../../redux/categorySlice";
import { createProduct, getProducts } from "../../redux/productSlice";
import { toast } from "react-toastify";

const { Option } = Select;
const CreateProduct = ({ onClose }) => {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState("");
  const [uom, setUOM] = useState("");

  const [stock, setCountStock] = useState("");
  const [modalNo, setModelNo] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, Uom } = useSelector((state) => state.category);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0].title);
    }
  }, []);

  useEffect(() => {
    if (Uom && Uom.length > 0) {
      setUOM(Uom[0].title);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      stock,
      manufacturer,
      modalNo,
      category,
      location,
    };
    try {
      await dispatch(createProduct(newProduct)).unwrap();
      //    dispatch(getProducts())
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed To Create Product");
    }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(getUoms());
  }, []);
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-dark_bg_5 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">CREATE PRODUCT </h2>
        <form onSubmit={submitHandler}>
          <div>
            <div className="mb-3 mt-2">
              <label className="block text-sm font-medium text-gray-900 ">
                NAME
              </label>
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="inputForm"
                placeholder="Product Name"
              />
            </div>
            <div className="mb-3 mt-2">
              <label className="block text-sm font-medium text-gray-900 ">
                STOCK
              </label>
              <input
                name="stock"
                type="text"
                value={stock}
                onChange={(e) => setCountStock(e.target.value)}
                className="inputForm"
                placeholder="Count In Stock "
              />
            </div>
          </div>

          <div className="mb-3 mt-2">
            <label className="block text-sm font-medium text-gray-900 ">
              CATEGORY
            </label>
            <Select
              style={{ width: "100%" }}
              value={category}
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((cat) => (
                <Option key={cat._id} value={cat?.title}>
                  {cat?.title}
                </Option>
              ))}
            </Select>
          </div>

          <div className="mb-3 mt-2">
            <label className="block text-sm font-medium text-gray-900 ">
              UOM
            </label>
            <Select
              style={{ width: "100%" }}
              value={uom}
              onChange={(value) => setUOM(value)}
            >
              {Uom?.map((u) => (
                <Option key={u._id} value={u?.title}>
                  {u?.title}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <div className="mb-3 mt-2">
              <label className="block text-sm font-medium text-gray-900 ">
                MANUFACTURER
              </label>
              <input
                name="name"
                type="text"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="inputForm"
                placeholder="ADD MANUFACTURER "
              />
            </div>
            <div className="mb-3 mt-2">
              <label className="block text-sm font-medium text-gray-900 ">
                Modal NO
              </label>
              <input
                name="stock"
                type="text"
                value={modalNo}
                onChange={(e) => setModelNo(e.target.value)}
                className="inputForm"
                placeholder="Model No  "
              />
            </div>
          </div>
          <div className="mb-3 mt-2">
            <label className="block text-sm font-medium text-gray-900 ">
              LOCATION
            </label>
            <input
              name="stock"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="inputForm"
              placeholder="Model No  "
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

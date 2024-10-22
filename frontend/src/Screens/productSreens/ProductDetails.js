import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../redux/productSlice";
import { BiCart } from "react-icons/bi";

import { Select } from "antd";
import { addToCart } from "../../redux/cartSlice";
const { Option } = Select;

const ProductDetails = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const selectRef = useRef();

  const { product, isLoading, isError } = useSelector(
    (state) => state.products
  );
  console.log("productDetail", product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputKeypress = (e) => {
    if (e.key === "Enter") {
      const parsedValue = parseInt(inputValue, 10);

      if (parsedValue && parsedValue > 0 && parsedValue <= product.stock) {
        setQty(parsedValue);
      }
    }
  };

  const addRequisition = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/store-requisition");
  };

  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32  w-32 border-t-2 border-b-2 border-gray-200"></div>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h3 className="text-3xl font-bold text-center ">ASSET DETAIL</h3>
      <did className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-gray-500 p-5 rounded-lg shadow-lg">
          <h1 className="text-2xl text-white font-bold">{product?.name}</h1>
          <p>{product?.description ? product?.description : "N/A"}</p>

          <p className="text-slate-50 text-lg mb-2">
            {" "}
            {product.manufacturer && (
              <>
                <span>MANUFACTURER : - </span>
                {product?.manufacturer}
              </>
            )}
          </p>
          <p className="text-slate-50 text-lg mb-2">
            {" "}
            {product.manufacturer && (
              <>
                <span>SUPPLIER : - </span>
                {product?.supplier}
              </>
            )}
          </p>

          {/* input Goes Field  */}

          <div>
            <div>
              <h3>SELECT QTY </h3>
            </div>

            <div className="flex items-center space-x-4">
              <input
                placeholder="AD QTY HERE "
                ref={selectRef}
                onChange={handleInputChange}
                onKeyPress={handleInputKeypress}
                value={inputValue}
                className="text-gray-700 outline-none p-1 rounded-2xl"
              />
              <Select
                onChange={(value) => setQty(value)}
                value={qty}
                className="w-[100%]"
              >
                {[
                  ...Array(product.stock)
                    .keys()
                    .map((x) => (
                      <Option value={x + 1} key={x + 1}>
                        {x + 1}
                      </Option>
                    )),
                ]}
              </Select>
            </div>
          </div>
        </div>
        <div className="bg-slate-600 p-6 rounded-lg shadow-lg">
          <div className="text-white text-lg">
            <p className="font-semibold mb-2">STOCK INFO : -</p>
            <p>{product?.stock > 0 ? "In STOCK " : "OUT OF STOCK"}</p>

            <p className="text-xl ">STOCK : {product?.stock}</p>

            <p className="text-slate-50 text-lg mb-2">
              {" "}
              {product.uom && (
                <>
                  <span>UOM : </span>
                  {product?.uom ? product?.uom : "N/A"}
                </>
              )}
            </p>
          </div>
        </div>
      </did>

      <div className="w-full flex justify-end  my-4">
        <button
          onClick={addRequisition}
          className="flex items-center gap-3 py-3 bg-orange-600 px-5 rounded-2xl
          "
          disabled={product?.stock === 0}
        >
          <BiCart size={22} />
          <span>ADD REQUISITION</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

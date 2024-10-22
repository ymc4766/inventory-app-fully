import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { removeFromCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

const CartScreen = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Deleted Item From Cart");
  };

  const requisitionTypeHandler = () => {
    navigate("/requisition-type");
  };

  return (
    <div className="product-list">
      <div className="grid   gap-4 mt-3 py-6">
        <h1>REQUISITION NOTE</h1>
        <div className="">
          {cartItems.length === 0 ? (
            <span>
              YOUR REQUISITION IS EMPTY <Link to="/warehouse">GO back </Link>
            </span>
          ) : (
            <div className="table w-full">
              <table className="min-w-ful bg-gray-600 border border-gray-200 text-slate-100">
                <thead>
                  <tr>
                    <th>PRODUCT NAME</th>
                    <th>UOM</th>
                    <th>PRODUCT STOCK</th>
                    <th> MANUFACTURER</th>
                    <th>QTY</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.uom}</td>
                      <td>{item.stock}</td>
                      <td>{item.manufacturer}</td>
                      <td>{item.qty}</td>
                      <td onClick={() => removeFromCartHandler(item._id)}>
                        <AiFillDelete className="text-red-600" size={22} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="flex justify-end" onClick={requisitionTypeHandler}>
              <button className="bg-slate-600 text-slate-100 rounded-xl px-6 p-2 mt-2">
                Continue Requisition
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartScreen;

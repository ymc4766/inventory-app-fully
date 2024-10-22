import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ApprovedModal from "../../components/ApprovedModal";
import { removeFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

const ConfirmRequisition = () => {
  const { cartItems, requisitionSteps } = useSelector((state) => state.cart);
  const [showApprovedModal, setShowApprovedModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Removed From Cart");
  };
  const requisitionTypeHandler = () => {
    navigate("/requisition-type");
  };
  return (
    <div className="product-list">
      <div className="grid   gap-4 mt-3 py-6">
        <h1> FACTORY REQUISITION NOTE</h1>
        <div className="">
          {cartItems?.length === 0 ? (
            <span>
              YOUR REQUISITION IS EMPTY{" "}
              <Link to="/warehouse underline text-orange-600">GO back </Link>
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

          {cartItems.length > 0 &&
            Object.keys(requisitionSteps).length === 0 && (
              <div
                className="flex justify-end"
                onClick={requisitionTypeHandler}
              >
                <button className="bg-slate-600 text-slate-100 rounded-xl px-6 p-2 mt-2">
                  Continue Requisition
                </button>
              </div>
            )}

          {cartItems.length > 0 && requisitionSteps && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowApprovedModal(true)}
                className="bg-slate-600 text-slate-100 rounded-xl px-6 p-2 mt-2"
              >
                Continue Order
              </button>
            </div>
          )}

          {showApprovedModal && (
            <ApprovedModal
              showApprovedModal={showApprovedModal}
              setShowApprovedMadal={setShowApprovedModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmRequisition;

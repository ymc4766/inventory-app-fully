import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../../redux/orderSlice";
import { Link, useNavigate } from "react-router-dom";
import { clearCartItems } from "../../redux/cartSlice";

const PlaceOrder = () => {
  const { cartItems, approvedData, requisitionSteps } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder, { isLoading, error, isSuccess }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (!approvedData.reqBy) {
      navigate("/store-requisition");
    }

    if (isSuccess) {
      navigate("/my-orders-list");
    }
  }, [approvedData.reqBy, isSuccess]);

  const placeOrderHandler = async () => {
    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          qty: item.qty,
          price: item.price,
          stock: item.stock,
          supplier: item.supplier,
        })),
        approvedData,
        requisitionSteps,
      };

      const { res } = await createOrder(orderData).unwrap();
      dispatch(clearCartItems());
    } catch (err) {
      console.error("Failed to Create order", err);
    }
  };

  return (
    <div className="product-list">
      <div className="grid   gap-4 mt-3 py-6">
        <h1 className="flex justify-center text-2xl font-bold">PLACE ORDER </h1>
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
                      {/* <td onClick={() => removeFromCartHandler(item._id)}>
                        <AiFillDelete className="text-red-600" size={22} />
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <h3>APPROVED INFo</h3>
          <div>
            <h3>REQ By - {approvedData.reqBy}</h3>
            <h3> APPROVED BY - {approvedData.approvedBy}</h3>
            <p> COMMENT - {approvedData.comment}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            disabled={cartItems.length === 0}
            onClick={placeOrderHandler}
            className="bg-orange-600 text-black px-6 p-2 rounded-2xl"
          >
            SAVE REQUISITION
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

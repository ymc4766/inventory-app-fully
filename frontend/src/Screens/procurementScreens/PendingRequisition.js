import React from "react";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../redux/orderSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const PendingRequisition = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const navigate = useNavigate();

  const filteredOrders = data?.orders
    ? data?.orders?.filter((order) => !order.isDelivered)
    : [];

  return (
    <div className="w-full ">
      <div>
        <h1 className="text-lg text-center py-3">PENDING REQUISITION ORDERS</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <div>
            <div>
              <table className="w-full text-sm text-left text-gray-200  ">
                <thead>
                  <tr>
                    <th className="px-6 py-3">LPO- NO</th>
                    <th className="px-6 py-3">PRODUCT NAME</th>
                    <th className="px-6 py-3">QTY </th>
                    <th className="px-6 py-3">USER </th>
                    <th className="px-6 py-3">ORDER DATE </th>
                    <th className="px-6 py-3">DELIVER </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders?.map((order, index) => (
                    <tr className="bg-gray-700 border-b border-gray-600">
                      <td className="py-6 px-4">{order._id}</td>
                      <td className="py-6 px-4">
                        {order?.orderItems[0]?.name}
                      </td>
                      <td className="py-6 px-4">
                        {order?.orderItems?.map((item) => (
                          <p>{item.qty}</p>
                        ))}
                      </td>
                      <td className="py-6 px-4">{order.user?.name}</td>

                      <td className="py-6 px-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-6 px-4">
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <b className="flex items-center ">
                            <FaTimes size={18} className="mr-2" /> On process
                          </b>
                        )}
                      </td>

                      <td>
                        <Link to={`/inventory/order/${order._id}`}>View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingRequisition;

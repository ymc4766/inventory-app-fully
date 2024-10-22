import React from "react";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from "../../redux/orderSlice";
import Loader from "../../components/Loader";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LPO = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();

  const [deleteOrder] = useDeleteOrderMutation();

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted Succesfuly");
      refetch();
    } catch (err) {
      toast.error("An Err happen while Deleting Order");
    }
  };

  //   console.log("orders", orders);

  const filteredOrders =
    data?.orders &&
    data?.orders?.filter((order) => order.user?.dept === "Company");

  return (
    <div className="w-full ">
      <div>
        <h1>LOCAL PURCHASE ORDERS</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <div>
            <div>
              <table className=" w-full text-sm text-slate-100 uppercase bg-blue-600 border-b border-slate-100">
                <thead>
                  <tr>
                    <th className="px-6 py-3">S/N</th>
                    <th className="px-6 py-3">PRODUCT NAME</th>
                    <th className="px-6 py-3">USER </th>
                    <th className="px-6 py-3">ORDER DATE</th>
                    <th className="px-6 py-3">DELIVER DATE </th>
                    <th className="px-6 py-3">RECIEVED DATE</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders?.map((order, index) => (
                    <tr className="bg-gray-700 border-b border-gray-600">
                      <td className="py-6 px-4">{index + 1}</td>
                      <td className="py-6 px-4">
                        {order?.orderItems[0]?.name}
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
                            <FaTimes size={18} className="mr-2" /> Pending
                          </b>
                        )}
                      </td>

                      <td className="py-6 px-4">
                        {order.isReceived ? (
                          order.receivedAt.substring(0, 10)
                        ) : (
                          <b className="flex items-center ">
                            <FaTimes size={18} className="mr-2" /> Processing
                          </b>
                        )}
                      </td>

                      <td>
                        <Link to={`/orderdetail/${order._id}`}>View</Link>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteOrderHandler(order._id)}
                          className="p-2 bg-red-600 px-2 rounded-full mr-3 ml-3"
                        >
                          <RiDeleteBin7Fill size={22} className="" />
                        </button>
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

export default LPO;

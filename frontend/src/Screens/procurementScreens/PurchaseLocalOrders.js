import React, { useEffect } from "react";
import { useGetOrdersQuery } from "../../redux/orderSlice";
import Loader from "../../components/Loader";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LocalPurchaseOrders = () => {
  const { data, isLoading, error } = useGetOrdersQuery();

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo?.dept !== "Procurement") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  //   console.log("orders", orders);
  return (
    <div className="w-full ">
      <div>
        <h1 className="text-lg text-center  py-3">LOCAL PURCHASE ORDERS</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <div>
            <div>
              <table className=" w-full text-sm text-slate-100 uppercase bg-orange-600 border-b border-slate-100">
                <thead>
                  <tr>
                    <th className="px-6 py-3">S/N</th>
                    <th className="px-6 py-3">PRODUCT NAME</th>
                    <th className="px-6 py-3">USER </th>
                    <th className="px-6 py-3">ORDER DATE</th>
                    <th className="px-6 py-3">DELIVER DATE </th>
                    <th className="px-6 py-3">RECIEVED DATE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders &&
                    data?.orders
                      ?.filter((order) => order?.user?.dept === "Warehouse")
                      .map((order, index) => (
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
                                <FaTimes size={18} className="mr-2" />{" "}
                                Processing
                              </b>
                            )}
                          </td>

                          <td>
                            <Link to={`/procurement/order/${order._id}`}>
                              View
                            </Link>
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

export default LocalPurchaseOrders;

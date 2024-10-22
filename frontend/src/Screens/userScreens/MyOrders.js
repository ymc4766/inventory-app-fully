import React, { useEffect, useState } from "react";
import { useGetMyordersQuery } from "../../redux/orderSlice";
import { Link } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

const MyOrders = () => {
  const { data, errror, isLoading } = useGetMyordersQuery();

  // const [orders, setOrders] = useState([]);

  const orders = data?.orders || [];

  console.log(orders);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32  w-32 border-t-2 border-b-2 border-gray-200"></div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="flex justify-center py-3 mt-2 text-2xl font-bold">
          MY REQUISITIONS
        </h1>

        {orders && orders?.length === 0 ? (
          <Link className="underline text-orange-500 font-bold" to="/warehouse">
            YOUR REQUISITION EMPTY{" "}
          </Link>
        ) : (
          <div>
            <table className="w-full text-sm text-slate-300 ">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>GRN</th>
                  <th> PRODUCT NAME</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, i) => (
                  <tr key={order._id}>
                    <td>{i}</td>
                    <td>{order?._id}</td>
                    <td>{order?.orderItems[0]?.name}</td>
                    <td>{order?.createdAt.substring(0, 10)}</td>
                    <td>
                      {order?.isDelivered ? (
                        <b>
                          {" "}
                          <BiCheck /> {order?.deliveredAt.substring(0, 10)}
                        </b>
                      ) : (
                        <b className="flex items-center space-x-1">
                          <FaTimes size={22} className="mr-2 text-red-600" />
                          Pending
                        </b>
                      )}
                    </td>
                    <td>
                      <button className="px-4 bg-orange-400 text-slate-50 rounded-xl py-2">
                        <Link to={`/orderdetail/${order._id}`}>View</Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

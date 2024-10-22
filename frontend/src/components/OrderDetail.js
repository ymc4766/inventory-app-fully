import React from "react";

const OrderDetail = () => {
  const { error, order } = "";

  return (
    <div>
      <div>
        {error ? (
          <h3>{error}</h3>
        ) : (
          <div className="px-4">
            <div className="flex items-center justify-evenly">
              <div>
                <h3>Order Info</h3>
                <p>
                  <span className="font-bold text-slate-100">Order LPO:</span>{" "}
                  {order?._id}
                </p>
                <p>
                  <span className="font-bold">Order Date:</span>{" "}
                  {order?.createdAt && order?.createdAt?.substring(0, 10)}
                </p>

                <p>
                  <span className="font-bold">
                    Payment : {order?.approvedStatusProcur?.paymentMethod}
                  </span>{" "}
                  {/* {order.isPaid ? `Paid at ${order.paidAt}` : "Not Paid"} */}
                </p>
                <p>
                  <span className="font-bold">Delivery Status:</span>{" "}
                  {order?.isDelivered
                    ? `Delivered at ${order?.deliveredAt.substring(0, 10)}`
                    : "Not Delivered"}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold mb-4">Additional Info</h2>
                <p>
                  <span className="font-bold">Requested By:</span>{" "}
                  {order?.approvedData && order?.approvedData?.reqBy}
                </p>

                <p>
                  <span className="font-bold">Approved By:</span>{" "}
                  {order?.approvedData && order?.approvedData.approvedBy}
                </p>
                <p>
                  <span className="font-bold">Comment:</span>{" "}
                  {order?.approvedData && order?.approvedData.comment}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
              <div className="px-4">
                <table
                  striped
                  bordered
                  hover
                  responsive
                  className="w-full text-sm text-left text-slate-300 text-lg dark:text-gray-400"
                >
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>QUANTITY</th>
                      <th>price</th>
                      <th>supplier</th>
                      {!order?.isDelivered && <th> update</th>}
                    </tr>
                  </thead>

                  <tbody>
                    {order?.orderItems?.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{item.price ? item.price : "0"}</td>
                        <td>{item.supplier ? order.supplier : "N/A"} </td>
                        <td>Edit</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;

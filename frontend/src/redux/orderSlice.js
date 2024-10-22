import apiSlice from "./apiSlice";
import { ORDERS_URL } from "./constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/create`,
        method: "POST",
        body: { ...order },
      }),
    }),

    getMyorders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/updatestock`,
        method: "PUT",
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrderProcurement: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver/procur`,
        method: "PUT",
      }),
      keepUnusedDataFor: 5,
    }),
    updateOrderRecieved: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/receive`,
        method: "PUT",
      }),
      keepUnusedDataFor: 5,
    }),

    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyordersQuery,
  useGetOrderDetailsQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useDeliverOrderProcurementMutation,
  useUpdateOrderRecievedMutation,
  useDeleteOrderMutation,
} = orderApiSlice;

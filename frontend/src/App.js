import "./App.css";
import Landing from "./components/Landing";
import "./styles/products.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import Layout from "./Layout/Layout";
import LoginScreen from "./Screens/userScreens/LoginScreen";
import RegisterScreen from "./Screens/userScreens/RegisterScreen";
import Warehouse from "./Screens/productSreens/Warehouse";
import AuthUser from "./components/AuthUser";
import ProductDetails from "./Screens/productSreens/ProductDetails";
import CartScreen from "./Screens/CartScreen";
import RequisitionType from "./Screens/productSreens/RequisitionType";
import PurchaseRequisition from "./Screens/productSreens/PurchaseRequisition";
import PlaceOrder from "./Screens/productSreens/PlaceOrder";
import OrderDetails from "./Screens/productSreens/OrderDetails";

import MyOrders from "./Screens/userScreens/MyOrders";
import ConfirmRequisition from "./Screens/productSreens/ConfirmRequisition";
import LPO from "./Screens/productSreens/LPO";
import LocalPurchaseOrders from "./Screens/procurementScreens/PurchaseLocalOrders";
import PendingRequisition from "./Screens/procurementScreens/PendingRequisition";
import OrderDetailsProcur from "./Screens/procurementScreens/OrderDetailsProcur";
import ListUsers from "./Screens/userScreens/ListUsers";
import EditProduct from "./Screens/productSreens/EditProduct";
import GRN from "./Screens/productSreens/GRN";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<Navigate to="/" />} />

        <Route path="/login" exact element={<LoginScreen />} />
        <Route path="/register" exact element={<RegisterScreen />} />

        <Route
          path="/dashboard"
          exact
          element={
            <AuthUser>
              <Layout>
                <Dashboard />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/warehouse"
          exact
          element={
            <AuthUser>
              <Layout>
                <Warehouse />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/product/:id"
          exact
          element={
            <AuthUser>
              <Layout>
                <ProductDetails />
              </Layout>
            </AuthUser>
          }
        />
        <Route
          path="/store-requisition"
          exact
          element={
            <AuthUser>
              <Layout>
                <CartScreen />
              </Layout>
            </AuthUser>
          }
        />
        <Route
          path="/requisition-type"
          exact
          element={
            <AuthUser>
              <Layout>
                <RequisitionType />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/purchase-requisition"
          exact
          element={
            <AuthUser>
              <Layout>
                <PurchaseRequisition />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/confirm-requisition"
          exact
          element={
            <AuthUser>
              <Layout>
                <ConfirmRequisition />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/placeorder"
          exact
          element={
            <AuthUser>
              <Layout>
                <PlaceOrder />
              </Layout>
            </AuthUser>
          }
        />
        <Route
          path="/my-orders-list"
          exact
          element={
            <AuthUser>
              <Layout>
                <MyOrders />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/orderdetail/:id"
          exact
          element={
            <AuthUser>
              <Layout>
                <OrderDetails />
              </Layout>
            </AuthUser>
          }
        />
        <Route
          path="/LPO-factory"
          exact
          element={
            <AuthUser>
              <Layout>
                <LPO />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/LPO-procurement"
          exact
          element={
            <AuthUser>
              <Layout>
                <LocalPurchaseOrders />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/pending-requisition"
          exact
          element={
            <AuthUser>
              <Layout>
                <PendingRequisition />
              </Layout>
            </AuthUser>
          }
        />
        <Route
          path="/procurement/order/:id"
          exact
          element={
            <AuthUser>
              <Layout>
                <OrderDetailsProcur />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/listUsers"
          exact
          element={
            <AuthUser>
              <Layout>
                <ListUsers />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/edit/:id"
          exact
          element={
            <AuthUser>
              <Layout>
                <EditProduct />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/good-receive-Note"
          exact
          element={
            <AuthUser>
              <Layout>
                <GRN />
              </Layout>
            </AuthUser>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

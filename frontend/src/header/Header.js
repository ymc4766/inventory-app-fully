import React from "react";
import { BsJustify } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { clearCartItems } from "../redux/cartSlice";
const Header = ({ openSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutHandler());
    dispatch(clearCartItems());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="" onClick={openSidebar}>
        <BsJustify size={24} />
      </div>

      <div className="header-left">
        <h3 className="text-lg  sm:ml-3  md:text-2xl text-slate-100">
          Inventory Sys
        </h3>
      </div>

      <div className="flex items-center space-x-2">
        <p>{userInfo && userInfo?.name}</p>

        <button className="flex items-center space-x-1" onClick={logout}>
          <BiLogOut size={24} />

          <span className="">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

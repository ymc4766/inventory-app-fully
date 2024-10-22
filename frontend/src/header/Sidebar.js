import React, { useState, useEffect } from "react";
import { BiCheck, BiTime } from "react-icons/bi";
import { BsCart4, BsFillGrid3X2GapFill, BsGrid1X2Fill } from "react-icons/bs";
import { IoIosArrowUp, IoIosClose } from "react-icons/io";
import { FaToolbox, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { BsCheck2Square } from "react-icons/bs";
import { FaFirstOrderAlt } from "react-icons/fa6";

const Sidebar = ({ openSidebarToggle, openSidebar }) => {
  const [isIventoryOpen, setisInventoryOpen] = useState(true);
  const [isProcurementOpen, setIsProcurementOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const totalQty = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);

  const toggleInventory = () => {
    setisInventoryOpen(!isIventoryOpen);
  };

  const toggleProcurement = () => {
    setIsProcurementOpen(!isProcurementOpen);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand flex items-center space-x-2 text-slate-200 ">
          <BiTime size={24} className="icon_head mr-2" />
          {currentTime} {/* Display the current time */}
        </div>

        <span className="icon close_icon" onClick={openSidebar}>
          <IoIosClose size={24} className="text-slate-100 ml-4" />
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <BsGrid1X2Fill className="icon" />
            Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={toggleInventory}
          >
            <div className="flex items-center  space-x-2">
              <BsFillGrid3X2GapFill size={24} className="icon" />
              Inventory
            </div>

            {isIventoryOpen ? (
              <IoIosArrowUp className="icon ml-2" />
            ) : (
              <IoIosArrowUp className="icon ml-2 rotate-90" />
            )}
          </div>

          {isIventoryOpen && (
            <ul className="nested-list ml-8 space-y-3 mt-2">
              <li className="">
                <Link to="/warehouse" className="flex items-center ">
                  <FaToolbox size={22} className="icon " />
                  Warehouse
                </Link>
              </li>

              <li className="">
                <Link to="/store-requisition" className="flex items-center ">
                  <BsCart4 size={22} className="icon " />
                  Cart Reqs
                  <span className="badge text-orange-700 mt-[-20px]">
                    {totalQty}
                  </span>
                </Link>
              </li>
              <li className="">
                <Link to="/my-orders-list" className="flex items-center ">
                  <AiOutlineUserSwitch size={22} className="icon " />
                  My Requisitions
                </Link>
              </li>
              <li className="">
                <Link to="/LPO-factory" className="flex items-center ">
                  <FaFirstOrderAlt size={22} className="icon " />
                  LPO
                </Link>
              </li>
              {userInfo && userInfo.isAdmin && (
                <li className="">
                  <Link to="/listUsers" className="flex items-center ">
                    <FaUsers size={22} className="icon " />
                    HR
                  </Link>
                </li>
              )}

              <li className="">
                <Link to="/good-receive-note" className="flex items-center ">
                  <BiCheck size={22} className="icon " />
                  GRN
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="sidebar-list-item">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={toggleProcurement}
          >
            <div className="flex items-center  space-x-2">
              <BsCheck2Square size={24} className="icon" />
              Procurement
            </div>

            {isProcurementOpen ? (
              <IoIosArrowUp className="icon ml-2" />
            ) : (
              <IoIosArrowUp className="icon ml-2 rotate-90" />
            )}
          </div>
          {isProcurementOpen && (
            <ul className="ml-8 space-y-3 mt-2">
              <li className="">
                <Link
                  to="/LPO-procurement"
                  className=" underline hover:text-gray-700"
                >
                  {" "}
                  Local purchase Order
                </Link>
              </li>
              <li className="">
                <Link
                  to="/pending-requisition"
                  className=" underline hover:text-gray-700"
                >
                  {" "}
                  Pending Requisition
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

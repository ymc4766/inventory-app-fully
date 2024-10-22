import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveRequisitionSteps } from "../../redux/cartSlice";
import CheckSteps from "../../components/CheckSteps";

const RequisitionType = () => {
  //   const [type1, setTypeOne] = useState("FACTORY REQUISITION"); // this  for warehouse Employee
  //   const [type2, setTypeTwo] = useState("PURCHASE REQUISITION"); // 4  procurement people

  const [selectedRequisitionType, setSelectedRequisitiontype] = useState(
    "FACTORY REQUISITION"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedRequisitionTypeHandler = (event) => {
    setSelectedRequisitiontype(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // save requisition Type
    dispatch(saveRequisitionSteps(selectedRequisitionType));

    if (selectedRequisitionType === "FACTORY REQUISITION") {
      navigate("/confirm-requisition");
    } else if (selectedRequisitionType === "PURCHASE REQUISITION") {
      navigate("/purchase-requisition");
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        {/* <CheckSteps step1 step2 /> */}
        <h3>REQUISITION METHOD</h3>
        <form className="mt-1 flex flex-col space-y-3" onSubmit={submitHandler}>
          <div>
            <lable>CHOOSE REQUISITION TYPE</lable>

            <select
              value={selectedRequisitionType}
              onChange={selectedRequisitionTypeHandler}
              className="w-full py-2 px-3 mt-1 border border-gray-300 bg-white text-gray-600 focus:outline-none"
            >
              <option value="FACTORY REQUISITION">FACTORY REQUISITION </option>
              <option value="PURCHASE REQUISITION">
                PURCHASE REQUISITION{" "}
              </option>
            </select>
          </div>

          <button className="px-4 bg-blue-500 rounded-2xl w-[120px] p-2">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default RequisitionType;

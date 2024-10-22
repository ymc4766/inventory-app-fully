import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
  useEdituserClrMutation,
  useListUsersQuery,
} from "../../redux/userApiSlice";
import { useSelector } from "react-redux";

const departments = [
  "Company",
  "Warehouse",
  "Maintenance",
  "Production",
  "Silo",
  "Procurement",
];

const EditUserClearance = ({ user, onClose }) => {
  const [name, setName] = useState(user?.name);
  const [dept, setDept] = useState(user?.dept);

  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);

  const [EdituserClr, { isLoading, isSuccess, error }] =
    useEdituserClrMutation();

  const { refetch } = useListUsersQuery();

  const submitHandler = async (e) => {
    e.preventDefault();

    await EdituserClr({
      id: user?._id,
      name,
      dept,
      isAdmin,
    });
    // success msg
    toast.success("Successfully Updated User Clr");

    onClose();
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-dark_bg_5 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Edit User Clearance</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Department</label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Admin Status</label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="mr-2 leading-tight"
            />
            <span className="text-sm text-gray-700">Is Admin</span>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserClearance;

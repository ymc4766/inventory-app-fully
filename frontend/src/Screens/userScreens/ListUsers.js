import React, { useState, useEffect } from "react";
import { useListUsersQuery } from "../../redux/userApiSlice";
import { FaCheck, FaTimes, FaUserEdit } from "react-icons/fa";
import EditUserClearance from "./EditUsersClearance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ListUsers = () => {
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useListUsersQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && !userInfo?.isAdmin) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  const openModalHandler = (user) => {
    setEditModal(true);
    setSelectedUser(user);
  };

  const closeModalHandler = () => {
    setEditModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (data?.users) {
      const filtered = data.users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.dept.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, data]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {editModal && (
        <EditUserClearance user={selectedUser} onClose={closeModalHandler} />
      )}
      <div className="w-full py-4">
        <h3 className="text-gray-800 text-center text-2xl py-4">
          User Management Dashboard
        </h3>

        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by name, email, or department"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm  text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-sm"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <h3 className="text-red-500 text-center">
            {error?.data?.message || "Something went wrong"}
          </h3>
        ) : filteredUsers && filteredUsers.length > 0 ? (
          <div className="overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-6">ID</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Department</th>
                  <th className="py-3 px-6 text-center">Admin</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="py-3 px-6">{user._id}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.dept}</td>
                    <td className="py-3 px-6 text-center">
                      {user.isAdmin ? (
                        <FaCheck size={18} className="text-green-600" />
                      ) : (
                        <FaTimes size={18} className="text-red-600" />
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => openModalHandler(user)}
                        className="px-4 py-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 transition duration-200"
                      >
                        <FaUserEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-center text-gray-700">No Users Available</h3>
        )}
      </div>
    </div>
  );
};

export default ListUsers;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance.js";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/user/all-users"); // Adjust endpoint as needed
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusToggle = async (userId) => {
    try {
      const response = await axiosInstance.put(`/user/update-status/${userId}`);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isActive: !user.isActive } : user
      ));
    } catch (error) {
      console.error("Failed to toggle user status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to get badge color based on status
  const getStatusColor = (isActive) => {
    return isActive ? "bg-green-500" : "bg-red-500";
  };

  return (
    <div className="min-h-screen text-base py-4">
      <div className="bg-base-300 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Users List</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-400 text-left">
                <th>Profile</th>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-base-100">
                  <td className="py-3 text-lg">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img 
                          src={user.profilePic || "https://via.placeholder.com/40"} 
                          alt="Profile" 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-lg">{user.name}</td>
                  <td className="py-3 text-lg">{user.email}</td>
                  <td className="py-3 text-lg">
                    <div
                      className={`px-3 py-1 rounded-full text-white text-center text-sm font-medium w-fit ${getStatusColor(
                        user.isActive
                      )}`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td className="py-3 text-lg">
                    <button
                      onClick={() => handleStatusToggle(user._id)}
                      className={`btn btn-sm ${
                        user.isActive ? "btn-error" : "btn-success"
                      }`}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
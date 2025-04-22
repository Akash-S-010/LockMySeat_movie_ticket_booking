import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import Swal from 'sweetalert2';
import { UserSkeleton } from "../../components/shared/DashboardSkeletons";
import SearchBox from "../../components/shared/SearchBox.jsx";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/user/all-users");
        const userData = response.data.users || [];
        setUsers(userData);
        setFilteredUsers(userData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = users.filter(user =>
      user.name?.toLowerCase().includes(term.toLowerCase()) ||
      user.email?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleStatusToggle = async (userId) => {
    try {
      const response = await axiosInstance.put(`/user/update-status/${userId}`);
      const updatedUsers = users.map(user => 
        user._id === userId ? { ...user, isActive: !user.isActive } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error("Failed to toggle user status:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update user status',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (loading) {
    return <UserSkeleton />;
  }

  const getStatusColor = (isActive) => {
    return isActive ? "bg-green-500" : "bg-red-500";
  };

  return (
    <div className="min-h-screen text-base py-4">
      <div className="bg-base-300 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">User Management</h1>
          <SearchBox 
            onSearch={handleSearch}
            placeholder="Search users..."
          />
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
              {filteredUsers.map((user) => (
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
              {filteredUsers.length === 0 && (
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
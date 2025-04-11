import React from "react";

export const ShowSkeletons = ({ count = 5 }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <tr key={index} className="hover:bg-base-100 animate-pulse">
      <td className="py-3">
        <div className="w-12 h-16 rounded overflow-hidden bg-gray-700"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-1/2"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-2/3"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-1/3"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-1/4"></div>
      </td>
    </tr>
  ));

  return (
    <div className="min-h-screen text-base py-4">
      <div className="bg-base-300 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Active Shows</h1>
          <div className="flex items-center gap-4">
            <div className="w-64 h-10 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-24 h-10 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-400 text-left">
                <th>Poster</th>
                <th>Movie Title</th>
                <th>Theater Name</th>
                <th>Show Date</th>
                <th>Show Time</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{skeletons}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};




export const TheaterSkeleton = ({ count = 4 }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <tr key={index} className="hover:bg-base-100 animate-pulse">
      <td className="py-3 text-lg">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      </td>
      <td className="py-3 text-lg">
        <div className="h-6 bg-gray-700 rounded w-1/2"></div>
      </td>
      <td className="py-3 text-lg">
        <div className="h-6 w-20 bg-green-500 rounded-full"></div>
      </td>
    </tr>
  ));

  return (
    <div className="min-h-screen text-base py-4">
      <div className="bg-base-300 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">My Theaters</h1>
          <div className="w-64">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full bg-gray-700 animate-pulse rounded"
              disabled
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-400 text-left">
                <th>Theater Name</th>
                <th>Theater Location</th>
                <th>Theater Status</th>
              </tr>
            </thead>
            <tbody>{skeletons}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export const MovieListSkeleton = () => {
  let count = 5;
  const skeletons = Array.from({ length: count }, (_, index) => (
    <tr key={index} className="hover:bg-base-100 animate-pulse">
      <td className="py-3">
        <div className="w-12 h-16 rounded overflow-hidden bg-gray-700"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-1/2"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-1/3"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-2/3"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-1/4"></div>
      </td>
    </tr>
  ));

  return (
    <div className="min-h-screen text-base py-4">
      <div className="bg-base-300 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <tbody>{skeletons}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export const UserSkeleton = () => {
  let count = 5;
  const skeletons = Array.from({ length: count }, (_, index) => (
    <tr key={index} className="hover:bg-base-100 animate-pulse">
      <td className="py-3">
        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-full"></div>
      </td>
      <td className="py-3">
        <div className="h-6 w-20 bg-green-500 rounded-full"></div>
      </td>
      <td className="py-3">
        <div className="h-8 w-24 bg-red-500 rounded animate-pulse"></div>
      </td>
    </tr>
  ));

  return (
    <div className="min-h-screen text-base py-4">
      <div className="bg-base-300 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">User Management</h1>
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
            <tbody>{skeletons}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



export const TheaterManagementSkeleton = () => {
  let count = 5;
  const skeletons = Array.from({ length: count }, (_, index) => (
    <tr key={index} className="hover:bg-base-100 animate-pulse">
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      </td>
      <td className="py-3">
        <div className="h-6 bg-gray-700 rounded w-1/2"></div>
      </td>
      <td className="py-3">
        <div className="h-6 w-20 bg-green-500 rounded-full"></div>
      </td>
      <td className="py-3">
        <div className="flex space-x-2">
          <div className="h-8 w-20 bg-gray-500 rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-red-500 rounded animate-pulse"></div>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="min-h-screen text-base py-4">
      <div className="bg-base-300 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Theater Management</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-400 text-left">
                <th>Theater Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{skeletons}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

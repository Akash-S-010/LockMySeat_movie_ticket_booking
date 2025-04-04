import React from 'react';

const OwnerDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Revenue</h2>
            <p className="text-2xl font-bold">$24,500</p>
            <p className="text-sm text-base-content/70">This Month</p>
          </div>
        </div>
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Active Movies</h2>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-base-content/70">Currently Showing</p>
          </div>
        </div>
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Theaters</h2>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-base-content/70">Operating Locations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
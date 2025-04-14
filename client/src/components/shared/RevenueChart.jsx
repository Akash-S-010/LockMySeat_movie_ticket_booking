import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axiosInstance from '../../config/axiosInstance';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ role = 'owner' }) => {
  const [chartData, setChartData] = useState({ revenue: [], seats: [], labels: [] });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSeats, setTotalSeats] = useState(0);
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = role === 'admin' ? '/revenue/admin-revenue' : '/revenue/theaterOwner-revenue';
        const response = await axiosInstance.get(`${endpoint}?timeRange=${timeRange}`);
        const data = response.data;
        if (data.chartData) {
          setChartData(data.chartData);
          setTotalRevenue(data.revenue);
          setTotalSeats(data.totalSeats);
        } else {
          setError('No chart data available');
        }
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        setError('Failed to fetch revenue data. Please try again.');
      }
      setLoading(false);
    };
    fetchData();
  }, [role, timeRange]);

  // Revenue Line Chart Data
  const revenueChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Revenue (₹)',
        data: chartData.revenue,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  // Seats Booked Bar Chart Data
  const seatsChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Seats Booked',
        data: chartData.seats,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="container mx-auto mt-7">
      <div className="card bg-base-300 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">
            {role === 'admin' ? 'Admin Revenue & Booking Analytics' : 'Theater Owner Revenue & Booking Analytics'}
          </h2>
          <div className="flex justify-between items-center mb-4">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total Revenue</div>
                <div className="stat-value text-green-500">₹ {totalRevenue.toFixed(2)}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Seats Booked</div>
                <div className="stat-value">{totalSeats}</div>
              </div>
            </div>
            <select
              className="select select-bordered"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Line Chart */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="text-lg font-semibold">Revenue Over Time</h3>
                  {chartData.labels.length > 0 && chartData.revenue.some(v => v > 0) ? (
                    <Line data={revenueChartData} options={chartOptions} />
                  ) : (
                    <p className="text-center">No revenue data available for this period.</p>
                  )}
                </div>
              </div>

              {/* Seats Booked Bar Chart */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="text-lg font-semibold">Total Seats Booked</h3>
                  {chartData.labels.length > 0 && chartData.seats.some(v => v > 0) ? (
                    <Bar data={seatsChartData} options={chartOptions} />
                  ) : (
                    <p className="text-center">No seats booked for this period.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
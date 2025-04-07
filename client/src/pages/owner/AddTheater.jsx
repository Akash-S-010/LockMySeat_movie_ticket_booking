import React, { useState } from 'react';
import axiosInstance from '../../config/axiosInstance.js';
import { toast } from 'react-hot-toast';

const AddTheater = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rows: '',
    cols: '',
  });

  const [seatPattern, setSeatPattern] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateSeatingPattern = () => {
    const { rows, cols } = formData;
    const numRows = parseInt(rows);
    const numCols = parseInt(cols);

    if (!rows || !cols || isNaN(numRows) || isNaN(numCols) || numRows <= 0 || numCols <= 0) {
      setMessage('Please enter valid positive numbers for rows and columns.');
      return;
    }

    const seats = [];
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        const seatNumber = `${String.fromCharCode(65 + r)}${c + 1}`;
        seats.push({ seatNumber, isBooked: 'available' });
      }
    }
    setSeatPattern(seats);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !seatPattern.length) {
      setMessage('Please fill all fields and generate a seating pattern.');
      return;
    }

    try {
      const response = await axiosInstance.post('/theater/add-theater', {
        ...formData,
        seatPattern,
      });

      toast.success(response.data.message);
      setFormData({ name: '', location: '', rows: '', cols: '' });
      setSeatPattern([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Error adding theater:', error);
    }
  };

  return (
    <main className="sm:px-6 md:px-10 lg:px-0">
      <form onSubmit={handleSubmit} className="bg-base-300 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Add Theater</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Theater Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-2 px-4 bg-base-100 border border-base-100 rounded focus:outline-none focus:border-primary"
            placeholder="Enter theater name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 bg-base-100 border border-base-100 rounded focus:outline-none focus:border-primary"
            placeholder="Enter location"
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2">Rows</label>
            <input
              type="number"
              name="rows"
              value={formData.rows}
              onChange={handleChange}
              className="w-full p-2 bg-base-100 border border-base-100 rounded focus:outline-none focus:border-primary"
              placeholder="e.g., 5"
              min="1"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2">Columns</label>
            <input
              type="number"
              name="cols"
              value={formData.cols}
              onChange={handleChange}
              className="w-full p-2 bg-base-100 border border-base-100 rounded focus:outline-none focus:border-primary"
              placeholder="e.g., 10"
              min="1"
            />
          </div>
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={generateSeatingPattern}
            className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Generate Seating Pattern
          </button>
        </div>

        {/* Updated Seat Grid Display */}
        {seatPattern.length > 0 && (
          <div className="mb-6 p-4 bg-base-300 rounded-lg overflow-x-auto">
            <div
              className="grid gap-2 justify-center"
              style={{
                gridTemplateColumns: `repeat(${parseInt(formData.cols) || 1}, 1.75rem)`
              }}
            >
              {seatPattern.map((seat, index) => (
                <div
                  key={index}
                  className="w-7 h-7 bg-primary rounded-md flex items-center justify-center text-xs text-white"
                  title={seat.seatNumber}
                >
                  {/* Optional: show seat number */}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
          >
            Add Theater
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddTheater;

import axios from 'axios';
import React, { useState } from 'react';

const Scheduler = ({ project_id, setIsScheduleMeetModalOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    project_id: project_id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      start: `${formData.date}T${formData.time}:00`,
      project_id: formData.project_id,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MEET_BASE_API}/meeting/create`,
        data
      );
      if (response.status === 201) {
        alert(
          'Meeting Scheduled Successfully!\n Check your email for details.'
        );
        setIsScheduleMeetModalOpen(false);
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Failed to schedule meeting. Please try again.');
    }
  };

  return (
    <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white border-2 border-black shadow-xl p-4">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Schedule Meeting
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Meeting Title */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Meeting Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter meeting title"
              required
            />
          </div>

          {/* Meeting Date */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Meeting Time */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="time">
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Schedule Meeting
          </button>
        </form>
      </div>
    </div>
  );
};

export default Scheduler;

import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const TimelineForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState([
    { description: '', startDate: '', deadline: '' },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index][name] = value;
      return updatedValues;
    });
  };

  const addNewField = () => {
    setFormValues((prevValues) => [
      ...prevValues.map((field) => ({ ...field, compressed: true })),
      { description: '', startDate: '', deadline: '', compressed: false },
    ]);
  };

  const removeField = (index) => {
    setFormValues((prevValues) => prevValues.filter((_, i) => i !== index));
  };

  const toggleCompressed = (index) => {
    setFormValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index].compressed = false; // Always set to false to enable editing
      return updatedValues;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PROJECT_BASE_API}/api/projects/${id}/addTimeline`,
        { milestones: formValues } // Exclude 'compressed' from submission
      );
      if (response.status === 201) {
        alert('Timeline added successfully');
        setFormValues([
          { description: '', startDate: '', deadline: '', compressed: false },
        ]); // Reset form
        navigate(`project/all`);
      }
    } catch (error) {
      console.error('Error adding timeline:', error);
      alert('An error occurred while adding the timeline.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1">
        <div className="w-[17vw] bg-white shadow-md">
          <Sidebar />
        </div>

        <div className="flex-1 p-10 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Add Timeline
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {formValues.map((field, index) => (
              <div key={index} className="space-y-4">
                {field.compressed ? (
                  <div className="flex justify-between items-center border p-4 rounded-md bg-gray-100">
                    <span className="text-gray-800">
                      <strong>Description:</strong> {field.description} |{' '}
                      <strong>Start:</strong> {field.startDate} |{' '}
                      <strong>Deadline:</strong> {field.deadline}
                    </span>
                    <div className="space-x-4">
                      <button
                        type="button"
                        onClick={() => toggleCompressed(index)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeField(index)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 border p-4 rounded-md bg-gray-50">
                    <div className="flex flex-col">
                      <label
                        htmlFor={`description-${index}`}
                        className="text-gray-700 font-medium mb-2"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={field.description}
                        onChange={(e) => handleChange(index, e)}
                        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter milestone description"
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor={`startDate-${index}`}
                        className="text-gray-700 font-medium mb-2"
                      >
                        Start Date
                      </label>
                      <input
                        type="datetime-local"
                        name="startDate"
                        value={field.startDate}
                        onChange={(e) => handleChange(index, e)}
                        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor={`deadline-${index}`}
                        className="text-gray-700 font-medium mb-2"
                      >
                        Deadline
                      </label>
                      <input
                        type="datetime-local"
                        name="deadline"
                        value={field.deadline}
                        onChange={(e) => handleChange(index, e)}
                        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        required
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCompressed(index)}
                      className="text-gray-600 hover:underline mt-2"
                    >
                      Compress
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addNewField}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Add New Field
            </button>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TimelineForm;

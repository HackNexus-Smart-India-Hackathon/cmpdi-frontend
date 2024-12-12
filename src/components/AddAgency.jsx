import React, { useState } from 'react';

function AddAgency({
  subImplementingAgencies,
  onAddOrUpdateAgency,
  onRemoveAgency,
}) {
  const [newAgency, setNewAgency] = useState({
    name: '',
    investigator: { name: '', email: '' },
    lead: { name: '', email: '' },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('investigator')) {
      setNewAgency((prev) => ({
        ...prev,
        investigator: {
          ...prev.investigator,
          [name.split('.')[1]]: value,
        },
      }));
    } else if (name.startsWith('lead')) {
      setNewAgency((prev) => ({
        ...prev,
        lead: {
          ...prev.lead,
          [name.split('.')[1]]: value,
        },
      }));
    } else {
      setNewAgency((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddOrEditAgency = () => {
    if (!newAgency.name) return;

    if (isEditing) {
      onAddOrUpdateAgency(newAgency, editingIndex);
    } else {
      onAddOrUpdateAgency(newAgency);
    }

    setNewAgency({
      name: '',
      investigator: { name: '', email: '' },
      lead: { name: '', email: '' },
    });
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEditAgency = (index) => {
    setNewAgency(subImplementingAgencies[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  return (
    <div>
      <label className="block font-medium mb-2">
        Sub Implementing Agencies
      </label>

      {subImplementingAgencies.map((agency, index) => (
        <div key={index} className="border p-4 rounded-md mb-4">
          <div className="mb-2">
            <p className="font-medium">{agency.name}</p>
            <p className="text-sm text-gray-600">
              <strong>Investigator:</strong> {agency.investigator.name} (
              {agency.investigator.email})
            </p>
            <p className="text-sm text-gray-600">
              <strong>Lead:</strong> {agency.lead.name} ({agency.lead.email})
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleEditAgency(index)}
              className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onRemoveAgency(index)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <label className="block font-medium mb-2">
          {isEditing
            ? 'Edit Sub Implementing Agency'
            : 'Add Sub Implementing Agency'}
        </label>
        <input
          type="text"
          name="name"
          value={newAgency.name}
          onChange={handleInputChange}
          placeholder="Agency Name"
          className="w-full px-4 py-2 border rounded-md mb-2"
        />
        <input
          type="text"
          name="investigator.name"
          value={newAgency.investigator.name}
          onChange={handleInputChange}
          placeholder="Project Investigator Name"
          className="w-full px-4 py-2 border rounded-md mb-2"
        />
        <input
          type="email"
          name="investigator.email"
          value={newAgency.investigator.email}
          onChange={handleInputChange}
          placeholder="Project Investigator Email"
          className="w-full px-4 py-2 border rounded-md mb-2"
        />
        <input
          type="text"
          name="lead.name"
          value={newAgency.lead.name}
          onChange={handleInputChange}
          placeholder="Project Lead Name"
          className="w-full px-4 py-2 border rounded-md mb-2"
        />
        <input
          type="email"
          name="lead.email"
          value={newAgency.lead.email}
          onChange={handleInputChange}
          placeholder="Project Lead Email"
          className="w-full px-4 py-2 border rounded-md mb-2"
        />
        <button
          type="button"
          onClick={handleAddOrEditAgency}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          {isEditing ? 'Update Agency' : 'Add Agency'}
        </button>
      </div>
    </div>
  );
}

export default AddAgency;

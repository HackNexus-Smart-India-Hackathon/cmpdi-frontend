import React, { useState } from 'react';

const ProjectOutlay = ({ projectOutlay, agencyName, Title }) => {
  const [numYears, setNumYears] = useState(3);
  const [data, setData] = useState({
    'Capital Expenditure': {
      'Land Building': { totalCost: '', yearWise: Array(numYears).fill('') },
      Equipment: { totalCost: '', yearWise: Array(numYears).fill('') },
    },
    'Revenue Expenditure': {
      Salaries: { totalCost: '', yearWise: Array(numYears).fill('') },
      Consumables: { totalCost: '', yearWise: Array(numYears).fill('') },
      Travel: { totalCost: '', yearWise: Array(numYears).fill('') },
      Workshop: { totalCost: '', yearWise: Array(numYears).fill('') },
    },
    'Other Costs': {
      Contingency: { totalCost: '', yearWise: Array(numYears).fill('') },
      'Institutional Overhead': {
        totalCost: '',
        yearWise: Array(numYears).fill(''),
      },
      'Taxes Duties': { totalCost: '', yearWise: Array(numYears).fill('') },
    },
  });

  const handleYearChange = (e) => {
    const newNumYears = Number(e.target.value);
    setNumYears(newNumYears);

    const updatedData = { ...data };
    Object.keys(updatedData).forEach((category) => {
      Object.keys(updatedData[category]).forEach((subCategory) => {
        updatedData[category][subCategory].yearWise =
          Array(newNumYears).fill('');
      });
    });
    setData(updatedData);
  };

  const handleInputChange = (category, subCategory, key, value) => {
    const updatedData = { ...data };
    if (key === 'totalCost') {
      updatedData[category][subCategory].totalCost = value;
    } else {
      const yearIndex = Number(key.split('year')[1]) - 1;
      updatedData[category][subCategory].yearWise[yearIndex] = value;
    }
    setData(updatedData);
    // console.log(projectOutlay);
    projectOutlay(agencyName, data);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Project Outlay for {Title}</h2>

      {/* Number of Years Selector */}
      <div className="mb-6">
        <label
          htmlFor="numYears"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Select Number of Years:
        </label>
        <select
          id="numYears"
          value={numYears}
          onChange={handleYearChange}
          className="block w-1/4 px-3 py-2 border border-gray-300 rounded-md"
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} Years
            </option>
          ))}
        </select>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Subcategory</th>
              <th className="border px-4 py-2 text-left">Total Cost</th>
              {[...Array(numYears)].map((_, index) => (
                <th key={index} className="border px-4 py-2 text-left">
                  Year {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([category, subItems]) =>
              Object.entries(subItems).map(
                ([subCategory, fields], subIndex) => (
                  <tr key={`${category}-${subCategory}`}>
                    <td className="border px-4 py-2">
                      {subIndex === 0 && (
                        <span className="font-medium capitalize">
                          {category}
                        </span>
                      )}
                    </td>
                    <td className="border px-4 py-2">{subCategory}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        value={fields.totalCost}
                        onChange={(e) =>
                          handleInputChange(
                            category,
                            subCategory,
                            'totalCost',
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 border rounded"
                        placeholder="Enter total cost"
                      />
                    </td>
                    {fields.yearWise.map((value, yearIndex) => (
                      <td key={yearIndex} className="border px-4 py-2">
                        <input
                          type="number"
                          value={value}
                          onChange={(e) =>
                            handleInputChange(
                              category,
                              subCategory,
                              `year${yearIndex + 1}`,
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 border rounded"
                          placeholder={`Year ${yearIndex + 1}`}
                        />
                      </td>
                    ))}
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectOutlay;

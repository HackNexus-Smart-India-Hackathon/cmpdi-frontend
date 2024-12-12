import React from 'react';

function SubAgencyOutlay({ outlay, onChange }) {
  const handleOutlayChange = (e, category, item) => {
    const { name, value } = e.target;
    onChange({
      ...outlay,
      [category]: {
        ...(outlay[category] || {}),
        [item]: {
          ...(outlay[category]?.[item] || {}),
          [name]: value,
        },
      },
    });
  };

  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2">Project Outlay</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h5 className="font-medium">Capital Expenditure</h5>
          <label>Land & Building</label>
          <input
            type="text"
            name="totalCost"
            placeholder="Total Cost"
            value={outlay.capitalExpenditure?.landBuilding?.totalCost || ''}
            onChange={(e) =>
              handleOutlayChange(e, 'capitalExpenditure', 'landBuilding')
            }
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div>
          <h5 className="font-medium">Revenue Expenditure</h5>
          <label>Salaries</label>
          <input
            type="text"
            name="totalCost"
            placeholder="Total Cost"
            value={outlay.revenueExpenditure?.salaries?.totalCost || ''}
            onChange={(e) =>
              handleOutlayChange(e, 'revenueExpenditure', 'salaries')
            }
            className="w-full px-2 py-1 border rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default SubAgencyOutlay;

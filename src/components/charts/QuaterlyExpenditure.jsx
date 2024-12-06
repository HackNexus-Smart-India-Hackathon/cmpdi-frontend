import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const QuarterlyExpenditure = () => {
  const data = {
    Q1: { Land: 20, Equipment: 15, Manpower: 25, Consumable: 10, TA_DA: 5 },
    Q2: { Land: 25, Equipment: 20, Manpower: 30, Consumable: 15, TA_DA: 8 },
    Q3: { Land: 30, Equipment: 25, Manpower: 35, Consumable: 20, TA_DA: 10 },
    Q4: { Land: 35, Equipment: 30, Manpower: 40, Consumable: 25, TA_DA: 12 },
  };

  const categories = ['Land', 'Equipment', 'Manpower', 'Consumable', 'TA_DA'];
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  const [compareQuarters, setCompareQuarters] = useState(['Q1', 'Q2']);

  // Bar Chart Options
  const barChartOptions = {
    chart: { type: 'bar' },
    xaxis: { categories },
    title: { text: `Expenditure for ${selectedQuarter}` },
    legend: { position: 'bottom' },
  };
  const barChartSeries = [
    {
      name: 'Expenditure (Rs. Lakhs)',
      data: categories.map((cat) => data[selectedQuarter][cat]),
    },
  ];

  // Line Chart Options
  const lineChartOptions = {
    chart: { type: 'line' },
    xaxis: { categories: Object.keys(data) },
    title: { text: 'Progressive Expenditure Over Quarters' },
    legend: { position: 'bottom' },
  };
  const lineChartSeries = categories.map((cat) => ({
    name: cat,
    data: Object.keys(data).map((q) => data[q][cat]),
  }));

  // Radar Chart Options
  const radarChartOptions = {
    chart: { type: 'radar' },
    xaxis: { categories },
    title: { text: `Proportional Expenditure for ${selectedQuarter}` },
  };
  const radarChartSeries = [
    {
      name: selectedQuarter,
      data: categories.map((cat) => data[selectedQuarter][cat]),
    },
  ];

  // Grouped Bar Chart Options
  const groupedBarChartOptions = {
    chart: { type: 'bar' },
    xaxis: { categories },
    title: { text: 'Quarterly Comparison' },
    legend: { position: 'bottom' },
  };
  const groupedBarChartSeries = compareQuarters.map((q) => ({
    name: q,
    data: categories.map((cat) => data[q][cat]),
  }));

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Quarterly Expenditure Dashboard
      </h1>

      {/* Dropdowns */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          onChange={(e) => setSelectedQuarter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          {Object.keys(data).map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
        <select
          onChange={(e) =>
            setCompareQuarters([e.target.value, ...compareQuarters.slice(1)])
          }
          className="p-2 border border-gray-300 rounded-md"
        >
          {Object.keys(data).map((q) => (
            <option key={q} value={q}>
              Compare: {q}
            </option>
          ))}
        </select>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="p-4 border rounded-lg shadow">
          <Chart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={300}
          />
        </div>

        {/* Radar Chart */}
        <div className="p-4 border rounded-lg shadow">
          <Chart
            options={radarChartOptions}
            series={radarChartSeries}
            type="radar"
            height={300}
          />
        </div>
      </div>

      <div className="mt-6">
        {/* Line Chart */}
        <div className="p-4 border rounded-lg shadow">
          <Chart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={300}
          />
        </div>
      </div>

      <div className="mt-6">
        {/* Grouped Bar Chart */}
        <div className="p-4 border rounded-lg shadow">
          <Chart
            options={groupedBarChartOptions}
            series={groupedBarChartSeries}
            type="bar"
            height={300}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-6 p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Detailed Data</h2>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">Category</th>
              {Object.keys(data).map((q) => (
                <th key={q} className="border border-gray-200 px-4 py-2">
                  {q}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat}>
                <td className="border border-gray-200 px-4 py-2">{cat}</td>
                {Object.keys(data).map((q) => (
                  <td key={q} className="border border-gray-200 px-4 py-2">
                    {data[q][cat]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuarterlyExpenditure;

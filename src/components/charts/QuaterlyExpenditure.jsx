import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const QuarterlyExpenditure = () => {
  const [data, setData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState("currentQuarter");
  const [compareQuarters, setCompareQuarters] = useState(["currentQuarter"]);
  const [selectedQuarter, setSelectedQuarter] = useState("Q1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/forms/quarterly-expenditure-statement/form/1"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const categories = data.financialDetails.map((item) => item.category);

  const getFeatureData = (feature) => {
    return categories.map((cat) => {
      const item = data.financialDetails.find((item) => item.category === cat);
      return parseFloat(item[feature]); // Convert to number for charting
    });
  };

  // Bar Chart Options
  const barChartOptions = {
    chart: { type: "bar" },
    xaxis: { categories },
    title: { text: `Expenditure for ${selectedFeature}` },
    legend: { position: "bottom" },
  };
  const barChartSeries = [
    {
      name: `Expenditure (${selectedFeature})`,
      data: getFeatureData(selectedFeature),
    },
  ];

  // Line Chart Options
  const lineChartOptions = {
    chart: { type: "line" },
    xaxis: { categories: compareQuarters },
    title: { text: "Progressive Expenditure Over Quarters" },
    legend: { position: "bottom" },
  };
  const lineChartSeries = compareQuarters.map((feature) => ({
    name: feature,
    data: getFeatureData(feature),
  }));

  // Radar Chart Options
  const radarChartOptions = {
    chart: { type: "radar" },
    xaxis: { categories },
    title: { text: `Proportional Expenditure for ${selectedFeature}` },
  };
  const radarChartSeries = [
    {
      name: selectedFeature,
      data: getFeatureData(selectedFeature),
    },
  ];

  // Grouped Bar Chart Options
  const groupedBarChartOptions = {
    chart: { type: "bar" },
    xaxis: { categories },
    title: { text: "Quarterly Comparison" },
    legend: { position: "bottom" },
  };
  const groupedBarChartSeries = compareQuarters.map((feature) => ({
    name: feature,
    data: getFeatureData(feature),
  }));

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Quarterly Expenditure Dashboard
      </h1>

      {/* Dropdowns for Main Feature and Quarter Selection */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          onChange={(e) => setSelectedQuarter(e.target.value)}
          value={selectedQuarter}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>
        <select
          onChange={(e) => setSelectedFeature(e.target.value)}
          value={selectedFeature}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="currentQuarter">Current Quarter</option>
          <option value="previousQuarter">Previous Quarter</option>
          <option value="previousYear">Previous Year</option>
          <option value="sanctionedProvision">Sanctioned Provision</option>
          <option value="totalApproved">Total Approved</option>
        </select>
        <select
          onChange={(e) =>
            setCompareQuarters([e.target.value, ...compareQuarters.slice(1)])
          }
          className="p-2 border border-gray-300 rounded-md"
        >
          {["Q1", "Q2", "Q3", "Q4"].map((q) => (
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
          <div className="mb-4">
            <label className="mr-2">Select Feature:</label>
            <select
              onChange={(e) => setSelectedFeature(e.target.value)}
              value={selectedFeature}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="currentQuarter">Current Quarter</option>
              <option value="previousQuarter">Previous Quarter</option>
              <option value="previousYear">Previous Year</option>
              <option value="sanctionedProvision">Sanctioned Provision</option>
              <option value="totalApproved">Total Approved</option>
            </select>
          </div>
          <Chart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={300}
          />
        </div>

        {/* Radar Chart */}
        <div className="p-4 border rounded-lg shadow">
          <div className="mb-4">
            <label className="mr-2">Select Feature:</label>
            <select
              onChange={(e) => setSelectedFeature(e.target.value)}
              value={selectedFeature}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="currentQuarter">Current Quarter</option>
              <option value="previousQuarter">Previous Quarter</option>
              <option value="previousYear">Previous Year</option>
              <option value="sanctionedProvision">Sanctioned Provision</option>
              <option value="totalApproved">Total Approved</option>
            </select>
          </div>
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
          <div className="mb-4">
            <label className="mr-2">Select Quarters to Compare:</label>
            <select
              onChange={(e) =>
                setCompareQuarters([
                  e.target.value,
                  ...compareQuarters.slice(1),
                ])
              }
              className="p-2 border border-gray-300 rounded-md"
            >
              {["Q1", "Q2", "Q3", "Q4"].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
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
          <div className="mb-4">
            <label className="mr-2">Select Quarters to Compare:</label>
            <select
              onChange={(e) =>
                setCompareQuarters([
                  e.target.value,
                  ...compareQuarters.slice(1),
                ])
              }
              className="p-2 border border-gray-300 rounded-md"
            >
              {["Q1", "Q2", "Q3", "Q4"].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
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
        <div className="mb-4">
          <label className="mr-2">Select Quarter:</label>
          <select
            onChange={(e) => setSelectedQuarter(e.target.value)}
            value={selectedQuarter}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
        </div>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">Category</th>
              <th className="border border-gray-200 px-4 py-2">
                Current Quarter
              </th>
              <th className="border border-gray-200 px-4 py-2">
                Previous Quarter
              </th>
              <th className="border border-gray-200 px-4 py-2">
                Previous Year
              </th>
              <th className="border border-gray-200 px-4 py-2">
                Sanctioned Provision
              </th>
              <th className="border border-gray-200 px-4 py-2">
                Total Approved
              </th>
            </tr>
          </thead>
          <tbody>
            {data.financialDetails.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-200 px-4 py-2">
                  {item.category}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {item.currentQuarter}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {item.previousQuarter}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {item.previousYear}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {item.sanctionedProvision}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {item.totalApproved}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuarterlyExpenditure;

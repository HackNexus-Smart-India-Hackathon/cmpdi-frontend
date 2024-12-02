import React from "react";
import Plot from "react-plotly.js";

const PieChart = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  return (
    <Plot
      data={[
        {
          values: values,
          labels: labels,
          type: "pie",
        },
      ]}
      layout={{
        title: "Pie Chart",
        width: 600,
        height: 400,
      }}
    />
  );
};

export default PieChart;

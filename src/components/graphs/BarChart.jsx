import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  const xValues = data.map((item) => item.label);
  const yValues = data.map((item) => item.value);

  return (
    <Plot
      data={[
        {
          x: xValues,
          y: yValues,
          type: 'bar',
          marker: {
            color: 'blue',
          },
        },
      ]}
      layout={{
        title: 'Bar Chart',
        xaxis: { title: 'Categories' },
        yaxis: { title: 'Values' },
        width: 600,
        height: 400,
      }}
    />
  );
};

export default BarChart;

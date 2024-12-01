import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const FundUtilizationChart = ({ utilized, total }) => {
  const remaining = total - utilized;

  const data = {
    labels: ['Utilized', 'Remaining'],
    datasets: [
      {
        data: [utilized, remaining],
        backgroundColor: ['#4caf50', '#f44336'], // Green for utilized, Red for remaining
        hoverBackgroundColor: ['#66bb6a', '#e57373'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-row w-auto items-center mx-auto bg-white p-2 rounded-lg shadow-md">
      <div>
        <h2 className="text-xl font-semibold text-center mb-2">
          Fund Utilization
        </h2>
        <Doughnut data={data} options={options} />
      </div>
      <div className="text-center mt-4">
        <p className="font-medium">Total Funds: ₹{total}</p>
        <p className="text-green-500">Utilized: ₹{utilized}</p>
        <p className="text-red-500">Remaining: ₹{remaining}</p>
      </div>
    </div>
  );
};

export default FundUtilizationChart;

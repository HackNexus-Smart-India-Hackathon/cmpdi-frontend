import React from "react";
import { Chart } from "react-google-charts";

const GanttChart = () => {
  // JSON data
  const jsonData = [
    {
      id: "Task1",
      name: "Event Planning",
      startDate: "2024-12-01",
      endDate: "2024-12-05",
      dependencies: null,
    },
    {
      id: "Task2",
      name: "Venue Preparation",
      startDate: "2024-12-06",
      endDate: "2024-12-10",
      dependencies: null,
    },
    {
      id: "Task3",
      name: "Invitations",
      startDate: "2024-12-03",
      endDate: "2024-12-07",
      dependencies: null,
    },
    {
      id: "Task4",
      name: "Final Event",
      startDate: "2024-12-5",
      endDate: "2024-12-15",
      dependencies: null,
    },
  ];

    const percentageComplete = (startDate, endDate) => {
        const currentDate = Date.now();
        if (currentDate >= endDate) return 100;
        return (currentDate - startDate) * 100 / (endDate - startDate);
  }
  // Helper function to convert string to JavaScript Date
  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Month is zero-based in JavaScript Date
  };

  // Convert JSON data to the format required by Google Charts
    const chartData = [
        [
            "Task ID",
            "Task Name",
            "Start Date",
            "End Date",
            "Duration",
            "Percent Complete",
            "Dependencies",
        ],
        ...jsonData.map((task) => [
            task.id,
            task.name,
            parseDate(task.startDate), // Convert string to Date
            parseDate(task.endDate),   // Convert string to Date
            parseDate(task.endDate) - parseDate(task.startDate),
            percentageComplete(parseDate(task.startDate), parseDate(task.endDate)),
            task.dependencies,
    ]),
  ];

  const options = {
    height: 400,
    gantt: {
      criticalPathEnabled: true, // Highlight the critical path
      criticalPathStyle: {
        stroke: "#e64a19", // Red color for critical path
        strokeWidth: 2,
      },
    },
  };

  return (
    <div>
      <h1>Gantt Chart</h1>
      <Chart
        chartType="Gantt"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default GanttChart;

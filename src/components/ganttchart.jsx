import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const GanttChart = () => {
  const [chartData, setChartData] = useState([]); // State to store the chart data

  useEffect(() => {
    // Demo task data for coal industry
    const demoData = [
      {
        id: 1,
        startDate: '2024-01-01T00:00:00Z',
        description: 'Feasibility Study for Coal Block A',
        deadline: '2024-06-30T23:59:59Z',
      },
      {
        id: 2,
        startDate: '2024-07-01T00:00:00Z',
        description: 'Environmental Impact Assessment',
        deadline: '2024-12-31T23:59:59Z',
      },
      {
        id: 3,
        startDate: '2025-01-01T00:00:00Z',
        description: 'Land Acquisition and Approvals',
        deadline: '2025-06-30T23:59:59Z',
      },
      {
        id: 4,
        startDate: '2025-07-01T00:00:00Z',
        description: 'Equipment Procurement',
        deadline: '2025-12-31T23:59:59Z',
      },
      {
        id: 5,
        startDate: '2026-01-01T00:00:00Z',
        description: 'Initial Mining Operations',
        deadline: '2026-12-31T23:59:59Z',
      },
    ];

    // Transform tasks to the format required by the Gantt chart
    const transformTasksToChartData = (tasks) => {
      const header = [
        'Task ID', // ID of the task
        'Task Name', // Description of the task
        'Start Date', // Start date of the task
        'End Date', // Deadline of the task
        'Duration', // Duration in days
        'Percent Complete', // Progress completion percentage
        'Dependencies', // Task dependencies (null for this case)
      ];

      const rows = tasks.map((task) => {
        const transformedTask = transformDataToGanttJson(task);
        const startDate = parseDate(transformedTask.startDate);
        const endDate = parseDate(transformedTask.endDate);
        return [
          transformedTask.id, // Task ID as a string
          transformedTask.name, // Task Name (description)
          startDate, // Start Date (ISO format converted to Date object)
          endDate, // End Date (ISO format converted to Date object)
          (endDate - startDate) / (1000 * 60 * 60 * 24), // Duration in days
          percentageComplete(startDate, endDate), // Percent Complete
          transformedTask.dependencies, // Dependencies (null for now)
        ];
      });

      return [header, ...rows];
    };

    // Process the demo data
    const formattedData = transformTasksToChartData(demoData);
    setChartData(formattedData);
  }, []);

  // Calculate the percentage of completion for the Gantt task
  const percentageComplete = (startDate, endDate) => {
    const currentDate = Date.now();
    if (currentDate >= endDate.getTime()) return 100;
    return (
      ((currentDate - startDate.getTime()) * 100) /
      (endDate.getTime() - startDate.getTime())
    );
  };

  // Transform task data to the required Gantt format
  const transformDataToGanttJson = (task) => ({
    id: `${task.id}`, // Ensure Task ID is a string
    name: task.description, // Map description to name
    startDate: task.startDate.split('T')[0], // Extract date from ISO format (YYYY-MM-DD)
    endDate: task.deadline.split('T')[0], // Extract date from ISO format (YYYY-MM-DD)
    dependencies: null, // Default dependencies to null (none in this case)
  });

  // Parse date from "YYYY-MM-DD" string format to JavaScript Date object
  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Month is zero-based
  };

  const options = {
    // height: 400,
    gantt: {
      criticalPathEnabled: true, // Highlight the critical path
      criticalPathStyle: {
        stroke: '#e64a19', // Red color for critical path
        strokeWidth: 2,
      },
      innerGridTrack: { fill: '#f9f9f9' },
      innerGridDarkTrack: { fill: '#dedede' },
    },
  };

  return (
    <div>
      <h1>Milestone</h1>
      <Chart
        chartType="Gantt"
        width="100%"
        height="260px"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default GanttChart;

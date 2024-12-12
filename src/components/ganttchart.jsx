import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const GanttChart = ({ id }) => {
  const [taskjson, setTaskjson] = useState(null); // State to store the fetched task data
  const [chartData, setChartData] = useState([]); // State to store the chart data

  useEffect(() => {
    // Fetch data from the API
    const transformTasksToChartData = (tasks) => {
      const header = [
        'Task ID',
        'Task Name',
        'Start Date',
        'End Date',
        'Duration',
        'Percent Complete',
        'Dependencies',
      ];

      const rows = tasks.map((task) => {
        const transformedTask = transformDataToGanttJson(task);
        const startDate = parseDate(transformedTask.startDate);
        const endDate = parseDate(transformedTask.endDate);
        return [
          transformedTask.id, // Task ID as a string
          transformedTask.name, // Task Name
          startDate, // Start Date
          endDate, // End Date
          (endDate - startDate) / (1000 * 60 * 60 * 24), // Duration in days
          percentageComplete(startDate, endDate), // Percent Complete
          transformedTask.dependencies, // Dependencies
        ];
      });

      return [header, ...rows];
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PROJECT_BASE_API}/api/projects/${id}/getMilestones`
        );
        const data = response.data.notification || {};
        setTaskjson(data);

        // Generate chart data after fetching
        if (data.tasks) {
          const formattedData = transformTasksToChartData(data.tasks);
          setChartData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const percentageComplete = (startDate, endDate) => {
    const currentDate = Date.now();
    if (currentDate >= endDate.getTime()) return 100;
    return (
      ((currentDate - startDate.getTime()) * 100) /
      (endDate.getTime() - startDate.getTime())
    );
  };

  const transformDataToGanttJson = (task) => ({
    id: `${task.id}`, // Ensure Task ID is a string
    name: task.description, // Map description to name
    startDate: task.startDate.split('T')[0], // Extract date from ISO format
    endDate: task.deadline.split('T')[0], // Extract date from ISO format
    dependencies: null, // Default dependencies to null
  });

  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Month is zero-based
  };

  const options = {
    height: 400,
    gantt: {
      criticalPathEnabled: true, // Highlight the critical path
      criticalPathStyle: {
        stroke: '#e64a19', // Red color for critical path
        strokeWidth: 2,
      },
    },
  };

  if (!taskjson) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

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

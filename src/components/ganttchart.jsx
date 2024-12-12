import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const GanttChart = () => {
  const [taskjson, setTaskjson] = useState(null); // State to store the task data

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects/43/getMilestones');
        const data = await response.json();
        setTaskjson(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const percentageComplete = (startDate, endDate) => {
    const currentDate = Date.now();
    if (currentDate >= endDate.getTime()) return 100;
    return (
      ((currentDate - startDate.getTime()) * 100) /
      (endDate.getTime() - startDate.getTime())
    );
  };

  const transformDataToGanttJson = (task) => {
    return {
      id: `Task${task.id}`, // Convert numeric ID to Task ID format
      name: task.description, // Map description to name
      startDate: task.startDate.split('T')[0], // Extract date from ISO format
      endDate: task.deadline.split('T')[0], // Extract date from ISO format
      dependencies: null, // Default dependencies to null
    };
  };

  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Month is zero-based
  };

  if (!taskjson) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  // Convert JSON data to the format required by Google Charts
  const chartData = [
    [
      'Task ID',
      'Task Name',
      'Start Date',
      'End Date',
      'Duration',
      'Percent Complete',
      'Dependencies',
    ],
    ...taskjson.tasks.map((task) => {
      const transformedTask = transformDataToGanttJson(task);
      const startDate = parseDate(transformedTask.startDate);
      const endDate = parseDate(transformedTask.endDate);
      return [
        transformedTask.id,
        transformedTask.name,
        startDate,
        endDate,
        endDate - startDate,
        percentageComplete(startDate, endDate),
        transformedTask.dependencies,
      ];
    }),
  ];

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

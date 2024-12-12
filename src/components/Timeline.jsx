import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MilestoneTimeline = () => {
  const { project } = useSelector((state) => state.auth);
  const [milestones, setMilestones] = useState([
    {
      id: 6,
      startDate: '2024-12-12T06:49',
      description: 'm2',
      deadline: '2024-12-27T01:19:00.000Z',
      notified: false,
      investigators_email: ['abc@gmail.com'],
      projectId: '43',
      createdAt: '2024-12-12T01:25:50.402Z',
      updatedAt: '2024-12-12T01:25:50.402Z',
    },
    {
      id: 7,
      startDate: '2024-12-20T06:50',
      description: 'm3',
      deadline: '2025-01-08T01:20:00.000Z',
      notified: false,
      investigators_email: ['abc@gmail.com'],
      projectId: '43',
      createdAt: '2024-12-12T01:25:50.476Z',
      updatedAt: '2024-12-12T01:25:50.476Z',
    },
    {
      id: 8,
      startDate: '2024-12-12T06:50',
      description: 'm1',
      deadline: '2024-12-20T01:20:00.000Z',
      notified: false,
      investigators_email: ['abc@gmail.com'],
      projectId: '43',
      createdAt: '2024-12-12T01:25:50.543Z',
      updatedAt: '2024-12-12T01:25:50.543Z',
    },
    {
      id: 9,
      startDate: '2024-12-12T06:49',
      description: 'm2',
      deadline: '2024-12-27T01:19:00.000Z',
      notified: false,
      investigators_email: ['abc@gmail.com'],
      projectId: '43',
      createdAt: '2024-12-12T01:26:33.053Z',
      updatedAt: '2024-12-12T01:26:33.053Z',
    },
    {
      id: 10,
      startDate: '2024-12-20T06:50',
      description: 'm3',
      deadline: '2025-01-08T01:20:00.000Z',
      notified: false,
      investigators_email: ['abc@gmail.com'],
      projectId: '43',
      createdAt: '2024-12-12T01:26:33.115Z',
      updatedAt: '2024-12-12T01:26:33.115Z',
    },
    {
      id: 11,
      startDate: '2024-12-12T06:50',
      description: 'm1',
      deadline: '2024-12-20T01:20:00.000Z',
      notified: false,
      investigators_email: ['abc@gmail.com'],
      projectId: '43',
      createdAt: '2024-12-12T01:26:33.180Z',
      updatedAt: '2024-12-12T01:26:33.180Z',
    },
  ]);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  // const [goalInput, setGoalInput] = useState('');

  // const addGoal = (milestoneId) => {
  //   if (goalInput.trim()) {
  //     setMilestones((prevMilestones) =>
  //       prevMilestones.map((milestone) =>
  //         milestone.id === milestoneId
  //           ? {
  //               ...milestone,
  //               goals: [
  //                 ...milestone.goals,
  //                 { text: goalInput.trim(), completed: false },
  //               ],
  //             }
  //           : milestone
  //       )
  //     );
  //     setGoalInput('');
  //   }
  // };

  // const toggleGoal = (milestoneId, goalIndex) => {
  //   setMilestones((prevMilestones) =>
  //     prevMilestones.map((milestone) =>
  //       milestone.id === milestoneId
  //         ? {
  //             ...milestone,
  //             goals: milestone.goals.map((goal, index) =>
  //               index === goalIndex
  //                 ? { ...goal, completed: !goal.completed }
  //                 : goal
  //             ),
  //           }
  //         : milestone
  //     )
  //   );
  // };

  // const calculateProgress = () => {
  //   const totalGoals = milestones.reduce(
  //     (acc, milestone) => acc + milestone.goals.length,
  //     0
  //   );
  //   const completedGoals = milestones.reduce(
  //     (acc, milestone) =>
  //       acc + milestone.goals.filter((goal) => goal.completed).length,
  //     0
  //   );
  //   return totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  // };

  // const progress = calculateProgress();
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PROJECT_BASE_API}/api/projects/${project.id}/milestones`
        );
        setMilestones(response.data.notification);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      }
    };
    fetchMilestones();
  }, [project.id]);

  return (
    <div className="w-full p-6 relative bg-slate-200 shadow-lg ">
      <div className="relative w-full h-1 top-[10px] bg-black rounded-full mx-auto">
        <div
          className="absolute top-0 left-0 h-1 rounded-full transition-all"
          style={{
            width: '100%',
            backgroundColor: 'white',
            // clipPath: `inset(0 ${100 - progress}% 0 0)`,
          }}
        ></div>
      </div>

      {/* Milestone Buttons */}
      <div className="relative flex justify-between items-center w-full -mt-2">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHoveredMilestone(milestone.id)}
            onMouseLeave={() => setHoveredMilestone(null)}
          >
            {/* Diamond Button */}
            <button className="w-4 h-4 bg-black transform rotate-45 translate-y-1/2"></button>

            {/* Fraction Display */}
            <p className="text-xs mt-2">
              {index + 1}/{milestones.length}
            </p>

            {/* Checklist UI */}
            {hoveredMilestone === milestone.id && (
              <div className="absolute z-20 top-10 left-1/2 transform -translate-x-1/2 bg-white text-black border border-black rounded-md p-4 shadow-lg">
                <ul className="list-none">
                  <li className="text-lg ">{milestone.description}</li>
                  <li>StartDate: {milestone.startDate.slice(0, 10)}</li>
                  <li>Deadline:{milestone.deadline.slice(0, 10)}</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneTimeline;

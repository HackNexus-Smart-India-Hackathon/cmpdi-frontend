import React, { useState } from 'react';

const milestones = [
  { id: 1, date: 'Jan 2014', title: 'Kick-off Call', goals: [] },
  { id: 2, date: 'Feb 2014', title: 'Data Gathering', goals: [] },
  { id: 3, date: 'Mar 2014', title: 'Check Point 1', goals: [] },
  { id: 4, date: 'Apr 2014', title: 'Release 1.0', goals: [] },
  { id: 5, date: 'May 2014', title: 'Check Point 2', goals: [] },
  { id: 6, date: 'Jun 2014', title: 'Release 3.0', goals: [] },
  { id: 7, date: 'Jul 2014', title: 'Check Point 3', goals: [] },
  { id: 8, date: 'Aug 2014', title: 'Project Wrap-up', goals: [] },
];

const MilestoneTimeline = () => {
  const [currentMilestone, setCurrentMilestone] = useState(null); // Tracks the clicked milestone
  const [goalInput, setGoalInput] = useState('');

  const addGoal = (milestoneId) => {
    const milestone = milestones.find((m) => m.id === milestoneId);
    if (milestone && goalInput.trim()) {
      milestone.goals.push(goalInput.trim());
      setGoalInput('');
    }
  };

  const toggleMilestone = (milestoneId) => {
    setCurrentMilestone((prev) => (prev === milestoneId ? null : milestoneId));
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center relative">
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black transform -translate-y-1/2 z-0"></div>

        {/* Milestones */}
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="relative flex flex-col items-center"
          >
            {/* Diamond Button */}
            <button
              className="w-4 h-4 bg-black transform rotate-45 hover:bg-gray-700"
              onClick={() => toggleMilestone(milestone.id)}
            ></button>

            {/* Add Goal UI */}
            {currentMilestone === milestone.id && (
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white text-black border border-black rounded-md p-4 shadow-lg z-10">
                <p className="font-bold mb-2">{milestone.title}</p>
                <p className="italic text-sm mb-2">{milestone.date}</p>
                <ul className="list-disc ml-4 mb-2">
                  {milestone.goals.length > 0 ? (
                    milestone.goals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No goals added.</li>
                  )}
                </ul>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-1 rounded mb-2"
                  value={goalInput}
                  placeholder="Add a goal"
                  onChange={(e) => setGoalInput(e.target.value)}
                />
                <button
                  className="w-full bg-black text-white py-1 rounded hover:bg-gray-800"
                  onClick={() => addGoal(milestone.id)}
                >
                  Add Goal
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneTimeline;

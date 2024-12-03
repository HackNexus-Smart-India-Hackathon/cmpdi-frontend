import React, { useState } from "react";

const MilestoneTimeline = () => {
  const [milestones, setMilestones] = useState([
    { id: 1, fraction: "0", goals: [] },
    { id: 2, fraction: "1/7", goals: [] },
    { id: 3, fraction: "2/7", goals: [] },
    { id: 4, fraction: "3/7", goals: [] },
    { id: 5, fraction: "4/7", goals: [] },
    { id: 6, fraction: "5/7", goals: [] },
    { id: 7, fraction: "6/7", goals: [] },
    { id: 8, fraction: "1", goals: [] },
  ]);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  const [goalInput, setGoalInput] = useState("");

  const addGoal = (milestoneId) => {
    if (goalInput.trim()) {
      setMilestones((prevMilestones) =>
        prevMilestones.map((milestone) =>
          milestone.id === milestoneId
            ? {
                ...milestone,
                goals: [
                  ...milestone.goals,
                  { text: goalInput.trim(), completed: false },
                ],
              }
            : milestone
        )
      );
      setGoalInput("");
    }
  };

  const toggleGoal = (milestoneId, goalIndex) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              goals: milestone.goals.map((goal, index) =>
                index === goalIndex
                  ? { ...goal, completed: !goal.completed }
                  : goal
              ),
            }
          : milestone
      )
    );
  };

  const calculateProgress = () => {
    const totalGoals = milestones.reduce(
      (acc, milestone) => acc + milestone.goals.length,
      0
    );
    const completedGoals = milestones.reduce(
      (acc, milestone) =>
        acc + milestone.goals.filter((goal) => goal.completed).length,
      0
    );
    return totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  };

  const progress = calculateProgress();

  return (
    <div className="w-full p-6 relative bg-slate-200 shadow-lg ">
      <div className="relative w-full h-1 top-[10px] bg-black rounded-full mx-auto">
        <div
          className="absolute top-0 left-0 h-1 rounded-full transition-all"
          style={{
            width: "100%",
            backgroundColor: "white",
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
          }}
        ></div>
      </div>

{/* Milestone Buttons */}
<div className="relative flex justify-between items-center w-full -mt-2">
  {milestones.map((milestone) => (
    <div
      key={milestone.id}
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHoveredMilestone(milestone.id)}
      onMouseLeave={() => setHoveredMilestone(null)}
    >
      {/* Diamond Button */}
      <button className="w-4 h-4 bg-black transform rotate-45 translate-y-1/2"></button>

      {/* Fraction Display */}
      <p className="text-xs mt-2">{milestone.fraction}</p>

      {/* Checklist UI */}
      {hoveredMilestone === milestone.id && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white text-black border border-black rounded-md p-4 shadow-lg z-10">
          <ul className="list-none">
            {milestone.goals.length > 0 ? (
              milestone.goals.map((goal, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => toggleGoal(milestone.id, index)}
                  />
                  <span
                    className={`${
                      goal.completed
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {goal.text}
                  </span>
                </li>
              ))
            ) : (
              <li className="italic text-gray-500">No goals added.</li>
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

import React from 'react';

const KeyMetrix = ({ backgroundColor, title, icon, description }) => {
  return (
    <div
      className={`rounded-lg p-4 text-center w-36 shadow-md m-2`}
      style={{ backgroundColor: backgroundColor || '#fbeedd' }}
    >
      <div className="text-orange-500 text-4xl">{icon}</div>
      <div className="text-gray-900 font-bold text-md mt-1">{description}</div>
      <div className="text-gray-800 font-medium text-lg mt-2">{title}</div>
    </div>
  );
};

export default KeyMetrix;

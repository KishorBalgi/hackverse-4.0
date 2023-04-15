import React from 'react';

const Alert = ({ message, type }) => {
  const alertClass = `px-4 py-2 rounded-md ${type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`;

  return (
    <div className={alertClass}>
      {message}
    </div>
  );
};

export default Alert;
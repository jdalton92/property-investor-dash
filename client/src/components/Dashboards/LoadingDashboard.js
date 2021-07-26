import React from "react";

const LoadingDashboard = () => {
  return (
    <>
      <div className="flex justify-between mt-2 mb-2">
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-8 w-80 mr-2"></div>
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-10 w-20 ml-auto"></div>
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-10 w-20 ml-2"></div>
      </div>
      <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-8 w-60 mb-2"></div>
      <div className="flex flex-col md:flex-row mb-2">
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-48 flex-1 mb-1 md:my-0 md:mr-1"></div>
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-48 flex-1 mb-1 md:my-0 md:mr-1"></div>
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-48 flex-1 mb-1 md:my-0 md:mr-1"></div>
      </div>
      <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-72 flex-1 mb-2"></div>
      <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-72 flex-1 mb-2"></div>
      <div className="flex flex-col md:flex-row mb-2">
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-48 flex-1 mb-1 md:my-0 md:mr-1"></div>
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-48 flex-1 mb-1 md:my-0 md:mr-1"></div>
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-48 flex-1 mb-1 md:my-0 md:mr-1"></div>
      </div>
      <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-72 flex-1 mb-2"></div>
      <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-72 flex-1 mb-2"></div>
    </>
  );
};

export default LoadingDashboard;

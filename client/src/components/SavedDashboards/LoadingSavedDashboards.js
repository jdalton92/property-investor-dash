import React from "react";

const LoadingSavedDashboards = () => {
  return (
    <>
      <div className="shadow-xl rounded-2xl p-4 bg-gray-100 mb-4 flex flex-col mb-4">
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-6 w-full mb-4"></div>
        <div className="flex mb-4">
          <div className="animate-pulse rounded-full bg-gray-300 w-12 mr-2"></div>
          <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-6 w-full"></div>
        </div>
        <div className="flex mb-4">
          <div className="animate-pulse rounded-full bg-gray-300 w-12 mr-2"></div>
          <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-6 w-full"></div>
        </div>
        <div className="flex mb-4">
          <div className="animate-pulse rounded-full bg-gray-300 w-12 mr-2"></div>
          <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-6 w-full"></div>
        </div>
        <div className="flex mb-4">
          <div className="animate-pulse rounded-full bg-gray-300 w-12 mr-2"></div>
          <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-6 w-full"></div>
        </div>
        <div className="flex mb-4">
          <div className="animate-pulse rounded-full bg-gray-300 w-12 mr-2"></div>
          <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-6 w-full"></div>
        </div>
      </div>
      <div className="animate-pulse shadow-lg rounded-md bg-gray-100 h-6 w-60"></div>
    </>
  );
};

export default LoadingSavedDashboards;

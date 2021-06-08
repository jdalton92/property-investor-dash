import React from "react";

const LoadingMenuContainer = () => {
  return (
    <div className="shadow-xl rounded-2xl p-4 bg-white mb-4 flex flex-col">
      <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-8 w-full mb-2"></div>
      <div className="flex mb-2">
        <div className="animate-pulse rounded-full bg-gray-300 w-10 mr-2"></div>
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-8 w-full"></div>
      </div>
      <div className="flex mb-2">
        <div className="animate-pulse rounded-full bg-gray-300 w-10 mr-2"></div>
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-8 w-full"></div>
      </div>
      <div className="flex">
        <div className="animate-pulse rounded-full bg-gray-300 w-10 mr-2"></div>
        <div className="animate-pulse shadow-lg rounded-md bg-gray-300 h-8 w-full"></div>
      </div>
    </div>
  );
};

export default LoadingMenuContainer;

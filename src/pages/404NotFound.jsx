import React from "react";
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold bg-space">Oops!</h1>
        <h2 className="mt-4 text-2xl font-bold">404 - PAGE NOT FOUND</h2>
        <p className="mt-2 text-gray-600">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link to="/"><button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          GO TO HOMEPAGE
        </button></Link>
      </div>
    </div>
  );
};

export default NotFound;

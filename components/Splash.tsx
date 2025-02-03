// components/SplashScreen.js
import React from "react";

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default SplashScreen;

import React from "react";

const Hero = () => {
  return (
    <div className="h-screen text-white w-full flex items-center">
      <div className="pl-6 md:pl-24 flex flex-col gap-y-6">
        <h2 className="text-3xl md:text-6xl flex flex-col font-black uppercase gap-y-1 md:gap-y-4 font-work-sans">
          <span>Development +</span>
          <span>Management</span>
        </h2>
        <div className="text-balance md:w-[60%] 2xl:w-[50%] text-base md:text-lg flex flex-col gap-y-2">
          <p>Joan Gerard is a Software Developer and Project Lead.</p>
          <p>
            He is passionate about creating innovative digital solutions,
            driving team collaboration, and continuously improving processes to
            deliver high-quality, user-centric applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

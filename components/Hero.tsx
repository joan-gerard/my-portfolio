import React from "react";

const Hero = () => {
  return (
    <div className="h-screen text-white w-full flex items-center">
      <div className="pl-6 md:pl-24 flex flex-col gap-y-6">
        <h2 className="text-3xl md:text-5xl flex flex-col font-black uppercase gap-y-1 md:gap-y-4 font-work-sans lg:w-1/2 text-balance">
          Software Development & Management
        </h2>
        <div className="text-balance 2xl:w-[50%] flex flex-col gap-y-3">
          <p className="text-lg md:text-xl">
            Joan Gerard leads and builds software projects.
          </p>
          <p className="text-base md:text-lg">
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

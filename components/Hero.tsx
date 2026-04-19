
const Hero = () => {
  return (
    <div className="h-screen text-white w-full flex items-center">
      <div className="pl-6 md:pl-24 flex flex-col gap-y-6">
        <h2 className="text-3xl md:text-5xl flex flex-col font-black uppercase gap-y-1 md:gap-y-4 font-work-sans lg:w-1/2 text-balance">
          Joan Gerard
        </h2>
        <div className="text-balance 2xl:w-[50%] flex flex-col gap-y-3">
          <p className="text-base md:text-lg">
            Full Stack Engineer with a growing DevOps skill set. I build
            thoughtful web applications and I am currently learning how to ship
            and run them better.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

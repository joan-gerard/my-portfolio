import About from "@/components/about";
import Experience from "@/components/experience";
import Hero_V3 from "@/components/Hero_V3";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <div>
      <div
        className="h-screen"
        style={{
          backgroundImage: `url('/home-hero-2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          color: "white",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
        }}
      >
        {/* <Image
          src="/home-hero-2.jpg"
          alt=""
          fill
          style={{
            objectFit: "cover",
          }}
        /> */}
        <Hero_V3 />
      </div>
      <About />
      <Work />
      <Experience />
    </div>
  );
}

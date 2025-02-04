import About from "@/components/about";
import Experience from "@/components/experience";
import Hero from "@/components/Hero";
import { Work } from "@/components/work";
import React from "react";

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
        <Hero />
      </div>
      <About />
      <Work />
      <Experience />
    </div>
  );
}

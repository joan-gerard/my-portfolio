import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="">
      <div className="h-screen">
        <Image
          src="/home-hero-2.jpg"
          alt=""
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="">
        <p>Section 2</p>
      </div>
    </div>
  );
}

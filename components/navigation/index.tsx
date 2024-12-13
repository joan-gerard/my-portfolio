"use client";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HamburgerButton } from "./ui/HamburgerButton";
import { NavigationContent } from "./NavigationContent";

export const Navigation = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="font-work-sans fixed z-20 w-full h-20 bg-white/5 backdrop-blur">
      <h1 className="fixed top-6 left-6 text-white text-2xl font-medium">
        Joan Gerard
      </h1>
      <HamburgerButton active={active} setActive={setActive} />
      <AnimatePresence>
        {active && <NavigationContent setActive={setActive} />}
      </AnimatePresence>
    </div>
  );
};

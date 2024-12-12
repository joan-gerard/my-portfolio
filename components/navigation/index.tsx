"use client";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HamburgerButton } from "./ui/HamburgerButton";
import { NavigationContent } from "./NavigationContent";

export const Navigation = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="font-work-sans">
      <h1 className="fixed z-10 top-6 left-6 text-white text-2xl font-medium">
        Joan Gerard
      </h1>
      <HamburgerButton active={active} setActive={setActive} />
      <AnimatePresence>{active && <NavigationContent />}</AnimatePresence>
    </div>
  );
};

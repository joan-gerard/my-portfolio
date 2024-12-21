"use client";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import NavigationPanel from "./NavigationPanel";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid place-content-center relative z-10">
      <div className="flex items-center text-white fixed justify-between w-full p-4 bg-white/5 backdrop-blur">
        <p className="text-white text-2xl font-medium">JOAN GERARD</p>
        <motion.button
          whileHover={{ rotate: "180deg" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="text-3xl text-white transition-colors rounded-full"
        >
          <FiMenu />
        </motion.button>
      </div>
      <NavigationPanel isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navigation;

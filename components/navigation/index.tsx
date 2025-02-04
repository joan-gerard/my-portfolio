"use client";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import NavigationPanel from "./NavigationPanel";
import Link from "next/link";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid place-content-center relative z-10">
      <div className="flex items-center text-white fixed justify-between w-full p-4 bg-black bg-opacity-90">
        <Link href="/" className="text-white text-2xl font-medium uppercase">
          Joan Gerard
        </Link>
        <motion.button
          whileHover={{ color: "#6366f1" }}
          whileTap={{ scale: 0.9, rotate: "180deg" }}
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

// src/components/notification/Badge.jsx
import React from "react";
import { motion } from "framer-motion";

function Badge({ count, animateBadge }) {
  return (
    <motion.div
      className={`absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${animateBadge ? "animate-ping" : ""}`}
      animate={{ scale: animateBadge ? 1.5 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {count}
    </motion.div>
  );
}

export default Badge;

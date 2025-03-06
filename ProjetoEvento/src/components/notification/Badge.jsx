import React from "react";
import { motion } from "framer-motion";

function Badge({ count, animateBadge }) {
  return (
    <motion.div
      className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
        animateBadge ? "animate-ping" : ""
      }`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {count}
    </motion.div>
  );
}

export default Badge;

import React from "react";
import { motion } from "framer-motion";

export function OrderConfirmGreetingPage() {
  return (
    <motion.div
      className="flex justify-center bg-slate-500 items-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-blue-500 text-white font-bold py-6 px-10 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h1 className="text-4xl">Congratulations!</h1>
        <p className="mt-2 text-lg">Your order is confirmed.</p>
      </motion.div>
    </motion.div>
  );
}

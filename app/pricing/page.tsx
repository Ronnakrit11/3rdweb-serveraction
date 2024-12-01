"use client";

import { Navbar } from "@/components/layout/navbar";
import { Pricing } from "@/components/home/pricing/pricing";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] bg-purple-900/30 rounded-full blur-3xl" />
        </div>
      </div>
      <Navbar />
      <div className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold gradient-text mb-6">Pricing Plans</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for you. From individual developers to enterprise teams, we have you covered.
          </p>
        </motion.div>
        <Pricing />
      </div>
    </main>
  );
}
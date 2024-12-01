"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight gradient-text mb-8">
            Full stack, open-source web3 development platform
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
            Frontend, backend, and onchain tools to build complete web3 apps — on every EVM chain.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button 
              size="lg" 
              className="px-6 py-6 text-base font-medium bg-white hover:bg-white/90 text-black"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-6 py-6 text-base font-medium border-white/20 bg-transparent hover:bg-white/10"
            >
              Documentation
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-background text-sm text-gray-400">
                Trusted by leading web3 teams
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
              >
                <div className="h-12 w-full bg-white/5 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
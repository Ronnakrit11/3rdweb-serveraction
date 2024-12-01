"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code2, Wallet, Boxes, Zap } from "lucide-react";

const features = [
  {
    name: "Smart Contracts",
    description:
      "Deploy and interact with smart contracts seamlessly across multiple chains.",
    icon: Code2,
  },
  {
    name: "Wallet Integration",
    description:
      "Connect with multiple wallet providers and manage digital assets easily.",
    icon: Wallet,
  },
  {
    name: "SDKs & Tools",
    description:
      "Comprehensive development tools and SDKs for building web3 applications.",
    icon: Boxes,
  },
  {
    name: "Fast Development",
    description:
      "Build and deploy faster with our intuitive development environment.",
    icon: Zap,
  },
];

export function Features() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold gradient-text">Everything you need to build web3</h2>
          <p className="mt-4 text-lg text-gray-400">
            Powerful tools and APIs to build production-ready web3 applications
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative h-full p-6 bg-white/5 hover:bg-white/10 transition-colors border-white/10 gradient-border">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 mb-4">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold">{feature.name}</h3>
                <p className="mt-2 text-gray-400">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
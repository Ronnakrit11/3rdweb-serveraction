"use client";

import { Wallet, Boxes, MessageCircle, Database, Zap, Users, BarChart, CreditCard, Headphones, Cpu, Users2, Clock } from "lucide-react";
import { PriceCard } from "./price-card";
import { motion } from "framer-motion";

export function Pricing() {
  const plans = [
    {
      title: "Starter",
      description: "Ideal for hobbyists who require basic features.",
      price: "$0",
      features: [
        { icon: Wallet, text: "1,000 monthly active wallets" },
        { icon: Boxes, text: "Web, Mobile & Gaming SDKs" },
        { icon: Database, text: "Contract & Wallet APIs" },
        { icon: MessageCircle, text: "Community Support" },
        { icon: Zap, text: "Blockchain infra (RPC, IPFS)" }
      ],
      buttonText: "Get Started for Free",
      tag: "Free"
    },
    {
      title: "Growth",
      description: "Ideal for scalable production-grade applications.",
      price: "$0",
      originalPrice: "$99",
      features: [
        { icon: Users, text: "10,000 monthly active wallets" },
        { icon: Cpu, text: "Production Grade Infrastructure" },
        { icon: Headphones, text: "Prioritized Support" },
        { icon: BarChart, text: "User Analytics" },
        { icon: CreditCard, text: "Advanced Paymaster Rules" }
      ],
      buttonText: "Claim your 1 month free",
      tag: "Popular Choice",
      popular: true
    },
    {
      title: "Pro",
      description: "Ideal for teams that require more customization, SLAs, and support.",
      price: "Custom",
      features: [
        { icon: Boxes, text: "Custom rate limits for APIs & Infra" },
        { icon: MessageCircle, text: "Dedicated support channel" },
        { icon: Clock, text: "Guaranteed support response time" },
        { icon: Users2, text: "Direct access to solutions team" },
        { icon: Cpu, text: "Enterprise grade SLAs" }
      ],
      buttonText: "Contact Us"
    }
  ];

  return (
    <div className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold gradient-text">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-gray-400">
            Choose the plan that best fits your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PriceCard
              key={plan.title}
              {...plan}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
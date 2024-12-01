"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PriceCardProps {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  period?: string;
  features: {
    icon: LucideIcon;
    text: string;
  }[];
  popular?: boolean;
  buttonText: string;
  tag?: string;
  delay?: number;
}

export function PriceCard({
  title,
  description,
  price,
  originalPrice,
  period = "/ month",
  features,
  popular,
  buttonText,
  tag,
  delay = 0,
}: PriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={`relative p-6 ${popular ? "gradient-border" : "border-white/10"} bg-white/5`}>
        {tag && (
          <span className={`absolute -top-3 left-6 px-3 py-1 text-sm rounded-full 
            ${popular ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300"}`}>
            {tag}
          </span>
        )}
        <div className="mb-6">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-gray-400">{description}</p>
        </div>
        <div className="mb-6">
          {originalPrice && (
            <span className="text-lg text-gray-500 line-through mr-2">
              {originalPrice}
            </span>
          )}
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="text-gray-400 ml-1">{period}</span>}
        </div>
        <div className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <feature.icon className="h-5 w-5 text-purple-400" />
              <span className="text-gray-300">{feature.text}</span>
            </div>
          ))}
        </div>
        <Button 
          className={`w-full ${popular ? "gradient-border bg-white/5 hover:bg-white/10 text-purple-300 hover:text-purple-200" : ""}`}
          variant={popular ? "default" : "outline"}
        >
          {buttonText}
        </Button>
      </Card>
    </motion.div>
  );
}
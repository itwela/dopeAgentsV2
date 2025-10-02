"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const AuroraText: React.FC<AuroraTextProps> = ({ 
  children, 
  className,
  gradient = "linear-gradient(135deg, #dc2626 0%, #ef4444 25%, #f87171 50%, #fca5a5 75%, #fecaca 100%)"
}) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold",
        className
      )}
      style={{
        background: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
};

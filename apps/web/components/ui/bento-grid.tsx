"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "./card";
import { cn } from "../../lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoGridItemProps {
  children: ReactNode;
  className?: string;
  size?: "1x1" | "1x2" | "2x1" | "2x2" | "2x3" | "3x1" | "3x2" | "3x3";
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
}

export function BentoGridItem({ children, className, size = "1x1" }: BentoGridItemProps) {
  const sizeClasses = {
    "1x1": "col-span-1 row-span-1",
    "1x2": "col-span-1 row-span-2",
    "2x1": "col-span-2 row-span-1",
    "2x2": "col-span-2 row-span-2",
    "2x3": "col-span-2 row-span-3",
    "3x1": "col-span-3 row-span-1",
    "3x2": "col-span-3 row-span-2",
    "3x3": "col-span-3 row-span-3",
  };

  return (
    <Card className={cn("overflow-hidden", sizeClasses[size], className)}>
      <CardContent className="p-6 h-full">
        {children}
      </CardContent>
    </Card>
  );
}

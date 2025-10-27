"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  status?: "completed" | "running" | "pending" | "error";
  stepNumber?: number;
  agentName?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case "running":
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-muted border-2 border-muted-foreground/20" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "border-emerald-200 bg-emerald-50/50";
      case "running":
        return "border-blue-200 bg-blue-50/50";
      case "error":
        return "border-red-200 bg-red-50/50";
      default:
        return "border-muted-foreground/20 bg-muted/30";
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative w-full">
        {/* Premium Timeline Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">
              Workflow Progress
            </span>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />
          
          {/* Progress Line */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-primary via-primary/80 to-transparent"
          />

          {/* Timeline Items */}
          <div className="space-y-16">
            {data.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-start gap-8 w-full"
              >
                {/* Timeline Node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`h-16 w-16 rounded-2xl ${getStatusColor(item.status)} border-2 flex items-center justify-center shadow-lg backdrop-blur-sm`}>
                    {getStatusIcon(item.status)}
                  </div>
                  
                  {/* Step Number Badge */}
                  {item.stepNumber && (
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-lg">
                      {item.stepNumber}
                    </div>
                  )}
                </div>

                {/* Content Card */}
                <div className="flex-1 min-w-0">
                  <div className="glass-card rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 w-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6 w-full">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight w-full">
                          {item.title}
                        </h3>
                        {item.agentName && (
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="text-sm font-medium text-muted-foreground tracking-wide">
                              {item.agentName}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Status Indicator */}
                      {item.status && (
                        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase flex-shrink-0 ${
                          item.status === "completed" 
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200" 
                            : item.status === "running"
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : item.status === "error"
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : "bg-muted text-muted-foreground border border-muted-foreground/20"
                        }`}>
                          {item.status}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="w-full text-foreground leading-relaxed [&_.prose]:max-w-none [&_.prose]:w-full">
                      <span className="w-full items-center justify-center flex">
                        {item.content}
                      </span>
                    </div>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/30">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide">
              {data.length} Step{data.length !== 1 ? 's' : ''} Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


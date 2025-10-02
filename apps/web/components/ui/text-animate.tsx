"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface TextAnimateProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale" | "bounce";
  by?: "word" | "character" | "line";
  duration?: number;
  delay?: number;
  stagger?: number;
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  bounce: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  }
};

export const TextAnimate: React.FC<TextAnimateProps> = ({
  children,
  className,
  animation = "fadeIn",
  by = "word",
  duration = 0.5,
  delay = 0,
  stagger = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  // Extract text content from JSX children
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (React.isValidElement(node)) {
      const props = node.props as any;
      if (typeof props.children === "string") return props.children;
      if (Array.isArray(props.children)) {
        return props.children.map(extractText).join("");
      }
    }
    return "";
  };

  const text = extractText(children);
  const words = text.split(" ");
  const characters = text.split("");

  const getAnimationVariants = () => {
    const baseAnimation = animations[animation];
    
    if (by === "character") {
      return {
        hidden: baseAnimation.hidden,
        visible: {
          ...baseAnimation.visible,
          transition: {
            duration,
            staggerChildren: stagger
          }
        }
      };
    } else if (by === "word") {
      return {
        hidden: baseAnimation.hidden,
        visible: {
          ...baseAnimation.visible,
          transition: {
            duration,
            staggerChildren: stagger
          }
        }
      };
    } else {
      return baseAnimation;
    }
  };

  const containerVariants = getAnimationVariants();

  const renderContent = () => {
    if (by === "character") {
      return (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className={cn("inline-block", className)}
        >
          {characters.map((char, index) => (
            <motion.span
              key={index}
              variants={animations[animation]}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      );
    } else if (by === "word") {
      return (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className={cn("inline-block", className)}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={animations[animation]}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      );
    } else {
      return (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{ duration, delay }}
          className={cn("inline-block", className)}
        >
          {children}
        </motion.div>
      );
    }
  };

  return renderContent();
};

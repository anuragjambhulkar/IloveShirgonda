"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  theme = "light", // "light" or "dark"
  ...otherProps
}) {
  // Theme-specific color controls
  const border = theme === "light" ? "border-[#C9933E]" : "border-white";
  const background =
    theme === "light"
      ? "bg-white text-[#C9933E] hover:bg-amber-50"
      : "bg-[#c87b2e]/70 text-white hover:bg-[#C9933E]/70";
  const finalClass =
    "relative flex h-full w-full items-center justify-center border-4 font-extrabold text-lg shadow-xl transition-all duration-200 " +
    background +
    " " +
    border;

  return (
    <Component
      className={cn(
        "relative h-16 w-44 overflow-hidden bg-transparent p-[2px] text-xl",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder
          duration={duration}
          rx="30%"
          ry="30%"
          color={theme === "light" ? "#C9933E" : "#fff"}
        >
          <div
            className={cn(
              "h-24 w-24 bg-[radial-gradient(theme(colors.amber.400)_40%,transparent_65%)] opacity-80",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(finalClass, className)}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}>
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  color = "#E63946",
  ...otherProps
}) => {
  const pathRef = useRef();
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x || 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y || 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          stroke={color}
          strokeWidth="4"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

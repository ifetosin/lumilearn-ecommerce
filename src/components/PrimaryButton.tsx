// src/components/PrimaryButton.tsx
"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export default function PrimaryButton({
  children,
  icon,
  iconPosition = "right",
  disabled,
  className = "",
  ...rest
}: Props) {
  const base =
    "flex items-center justify-center gap-2 py-3 rounded-2xl font-medium text-white transition-transform duration-200 ease-in-out";
  const bg = disabled ? "bg-gray-300" : "bg-[linear-gradient(3.06deg,#1C9647_26.39%,#76F1A2_157.92%)]";

  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      className={`${base} ${bg} ${!disabled ? "hover:scale-105" : "cursor-not-allowed"} ${className}`}
      {...rest}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
}

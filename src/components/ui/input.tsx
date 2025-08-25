"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn("w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring", className)} {...props} />;
  }
);

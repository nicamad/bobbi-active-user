"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" };
export const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant="default", ...props }, ref
){
  const base="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition";
  const styles= variant==="outline" ? "border bg-transparent hover:bg-gray-50" : "bg-black text-white hover:opacity-90";
  return <button ref={ref} className={cn(base, styles, className)} {...props} />;
});

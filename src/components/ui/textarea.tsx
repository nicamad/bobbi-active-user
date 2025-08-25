"use client";
import * as React from "react"; import { cn } from "@/lib/cn";
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn("w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring", className)} {...props} />;
  }
);

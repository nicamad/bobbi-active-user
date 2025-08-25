"use client";
import * as React from "react"; import { cn } from "@/lib/cn";
type Props = React.HTMLAttributes<HTMLSpanElement> & { variant?: "default"|"secondary"|"outline" };
export function Badge({ className, variant="default", ...props }: Props) {
  const styles = variant==="secondary" ? "bg-gray-100 text-gray-900 border"
               : variant==="outline"   ? "border"
               : "bg-black text-white";
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", styles, className)} {...props} />;
}

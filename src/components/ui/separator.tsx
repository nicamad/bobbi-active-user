"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal"|"vertical" };
export function Separator({ className, orientation="horizontal", ...props }: Props) {
  const base = orientation === "vertical" ? "h-full w-px" : "w-full h-px";
  return <div className={cn("bg-gray-200", base, className)} role="separator" {...props} />;
}

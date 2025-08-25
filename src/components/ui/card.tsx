"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={  return <div clborder p-4 shadow-sm", className)} {...props} />;
}
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} />; }
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />;
}
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} />; }

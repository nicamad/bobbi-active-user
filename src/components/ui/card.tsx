"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return <div className={cn("round  r2xl border p-4 shadow-sm", className)} {...rest} />;
}
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return <div className={cn("mb-2", className)} {...rest} />;
}
export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { className, ...rest } = props;
  return <h3 className={cn("text-lg font-semibold", className)} {...rest} />;
}
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return <div className={cn("space-y-3", className)} {...rest} />;
}

"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

export function Avatar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 overflow-hidden", className)} {...props}>{children}</div>;
}
export function AvatarImage({ alt="", src, className, ...props }:{
  alt?: string; src?: string; className?: string
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} src={src} className={cn("h-full w-full object-cover", className)} {...props} />;
}
export function AvatarFallback({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-sm font-medium text-gray-700", className)} {...props}>{children}</span>;
}

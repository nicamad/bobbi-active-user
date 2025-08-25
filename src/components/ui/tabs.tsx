"use client";
import * as React from "react"; import { cn } from "@/lib/cn";
type TabsCtx = { value: string; set: (v:string)=>void };
const Ctx = React.createContext<TabsCtx | null>(null);
export function Tabs({ defaultValue, value, onValueChange, className, children }:{
  defaultValue?: string; value?: string; onValueChange?: (v:string)=>void; className?: string; children: React.ReactNode;
}) {
  const [internal, setInternal] = React.useState(defaultValue || "");
  const controlled = value !== undefined;
  const v = controlled ? value! : internal;
  const set = (nv:string)=>{ controlled ? onValueChange?.(nv) : (setInternal(nv), onValueChange?.(nv)); };
  return <div className={cn("w-full", className)}><Ctx.Provider value={{value:v,set}}>{children}</Ctx.Provider></div>;
}
export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-3 inline-flex gap-2 rounded-xl border p-1", className)} {...props} />;
}
export function TabsTrigger({ value, className, ...props }:{
  value: string; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(Ctx)!; const active = ctx.value===value;
  return <button onClick={()=>ctx.set(value)} className={cn("rounded-lg px-3 py-1 text-sm", active?"bg-black text-white":"", className)} {...props} />;
}
export function TabsContent({ value, className, ...props }: { value:string } & React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(Ctx)!; if (ctx.value!==value) return null;
  return <div className={cn(className)} {...props} />;
}

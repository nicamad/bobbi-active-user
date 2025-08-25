"use client";
import * as React from "react";
type Ctx = { open:boolean; set:(v:boolean)=>void; side?:"left"|"right" };
const SheetCtx = React.createContext<Ctx | null>(null);
export function Sheet({ children, side="right" }:{ children: React.ReactNode; side?: "left"|"right" }) {
  const [open,setOpen]=React.useState(false);
  return <SheetCtx.Provider value={{open,set,side}}><div>{children}</div></SheetCtx.Provider>;
}
export function SheetTrigger({ children }:{ children: React.ReactNode }) {
  const ctx=React.useContext(SheetCtx)!; return <span onClick={()=>ctx.set(true)} className="cursor-pointer">{children}</span>;
}
export function SheetContent({ children }:{ children: React.ReactNode }) {
  const ctx=React.useContext(SheetCtx)!; if(!ctx.open) return null;
  const pos = ctx.side==="left"?"left-0":"right-0";
  return <div className="fixed inset-0 z-50">
    <div className="absolute inset-0 bg-black/40" onClick={()=>ctx.set(false)} />
    <div className={`absolute top-0 ${pos} h-full w-[360px] bg-white shadow-xl p-4`}>{children}</div>
  </div>;
}
export const SheetHeader = ({ children }:{ children: React.ReactNode }) => <div className="mb-2">{children}</div>;
export const SheetTitle  = ({ children }:{ children: React.ReactNode }) => <h3 className="text-lg font-semibold">{children}</h3>;
export const SheetDescription = ({ children }:{ children: React.ReactNode }) => <p className="text-sm text-gray-600">{children}</p>;

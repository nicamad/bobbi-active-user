"use client";
import * as React from "react";
type Ctx = { open:boolean; set:(v:boolean)=>void };
const DialogCtx = React.createContext<Ctx | null>(null);
export function Dialog({ children }:{ children: React.ReactNode }) {
  const [open,setOpen]=React.useState(false);
  return <DialogCtx.Provider value={{open,set}}><div>{children}</div></DialogCtx.Provider>;
}
export function DialogTrigger({ children }:{ children: React.ReactNode }) {
  const ctx=React.useContext(DialogCtx)!; return <span onClick={()=>ctx.set(true)} className="cursor-pointer">{children}</span>;
}
export function DialogContent({ children }:{ children: React.ReactNode }) {
  const ctx=React.useContext(DialogCtx)!; if(!ctx.open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
    <div className="rounded-2xl bg-white p-4 shadow-xl min-w-[320px]">{children}</div>
  </div>;
}
export const DialogHeader = ({ children }:{ children: React.ReactNode }) => <div className="mb-2">{children}</div>;
export const DialogTitle  = ({ children }:{ children: React.ReactNode }) => <h3 className="text-lg font-semibold">{children}</h3>;
export const DialogDescription = ({ children }:{ children: React.ReactNode }) => <p className="text-sm text-gray-600">{children}</p>;

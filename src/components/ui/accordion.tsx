"use client";
import * as React from "react";
export function Accordion({ children }:{ children: React.ReactNode }) { return <div>{children}</div>; }
export function AccordionItem({ value, children }:{ value:string; children: React.ReactNode }) { return <div data-value={value} className="border-b">{children}</div>; }
export function AccordionTrigger({ children }:{ children: React.ReactNode }) {
  const [open,setOpen]=React.useState(false);
  return <div className="py-2 cursor-pointer" onClick={()=>setOpen(o=>!o)}>
    <div className="font-medium">{children}</div>
    <div data-acc-open={open} />
  </div>;
}
export function AccordionContent({ children }:{ children: React.ReactNode }) {
  return <div className="pb-3 text-sm">{children}</div>;
}

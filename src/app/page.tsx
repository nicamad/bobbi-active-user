import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  BarChart,
  Check,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Zap,
  Lock,
  CreditCard,
  Settings,
  Store,
  Receipt,
  Users,
  BookOpen,
} from "lucide-react";
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  ResponsiveContainer,
} from "recharts";

// ---------------------------------------------
// Helper: Brand Palette & Utilities
// ---------------------------------------------
const brand = {
  primary: "from-violet-500 to-fuchsia-500",
  primaryText: "text-violet-600",
  ring: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2",
};

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`w-full py-16 md:py-24 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 md:px-6 ${className}`}>{children}</div>
);

// ---------------------------------------------
// Chatbot (Docked) — Persona: Bobbi
// ---------------------------------------------
const BACK_OFFICE_KEYWORDS = [
  "invoice",
  "invoicing",
  "payroll",
  "tax",
  "compliance",
  "inventory",
  "pricing",
  "cost",
  "margin",
  "bookkeeping",
  "receipts",
  "expense",
  "cash flow",
  "stripe",
  "square",
  "shopify",
  "quickbooks",
  "ecommerce",
  "forecast",
  "budget",
];

function isOnTopic(text) {
  const t = text.toLowerCase();
  return BACK_OFFICE_KEYWORDS.some((k) => t.includes(k));
}

const politeDeflections = [
  "That's interesting! Let’s refocus on your back office so I can help fastest.",
  "I want to respect your time—shall we get back to invoices, payroll, or margins?",
  "I don't really feel comfortable going there—but I can absolutely optimize your admin workflow.",
  "Gossip is for the group chat—shall we talk cash flow and pricing instead?",
];

function BobbiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I’m Bobbi—your Back‑Office Bot Buddi. I translate business into plain language, automate the boring bits, and cheer you on. What’s your biggest admin headache today?",
    },
  ]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { role: "user", content: trimmed };

    let reply = "";
    if (!isOnTopic(trimmed)) {
      reply = politeDeflections[Math.floor(Math.random() * politeDeflections.length)];
    } else {
      // Simple, kind, actionable replies reflecting Bobbi's tone
      if (trimmed.includes("invoice")) {
        reply =
          "Invoices eat time. I can auto‑generate, send reminders, and reconcile payments from Stripe/Square. Do you currently send invoices weekly or ad‑hoc?";
      } else if (trimmed.includes("payroll")) {
        reply =
          "Payroll should feel like a metronome. I integrate with Gusto or QuickBooks Payroll and handle filings. How many people are on your team today?";
      } else if (trimmed.includes("inventory")) {
        reply =
          "Let’s turn shelves into signals. A quick count of on‑hand units × unit cost gives us a live inventory value. Do you track this monthly or only when it hurts?";
      } else if (trimmed.includes("tax")) {
        reply =
          "No jump scares at tax time. I calendar filings, categorize expenses, and keep receipts audit‑ready. Are you a sole prop, LLC, or S‑Corp?";
      } else if (trimmed.includes("margin") || trimmed.includes("pricing") || trimmed.includes("cost")) {
        reply =
          "Margins are your oxygen. Tell me: average selling price and average cost per unit. I’ll calculate gross margin and flag where profit leaks.";
      } else {
        reply =
          "I can help here. Would you like me to (1) map your current process, (2) connect Stripe/Square/Shopify, or (3) estimate time saved per week?";
      }
    }

    setMessages((m) => [...m, userMsg, { role: "assistant", content: reply }]);
    setInput("");
  };

  return (
    <>
      <Button
        size="lg"
        className="fixed bottom-5 right-5 z-40 rounded-full shadow-lg"
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="mr-2 h-5 w-5" /> Chat with Bobbi
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[420px] p-0">
          <SheetHeader className="p-4">
            <SheetTitle className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              Bobbi — Back‑Office Bot Buddi
            </SheetTitle>
          </SheetHeader>
          <Separator />
          <div className="flex h-[70vh] flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-sm shadow ${
                      m.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-3">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Ask Bobbi about invoices, payroll, margins…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend}>
                  Send <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

// ---------------------------------------------
// Intake Wizard → produces a Mini‑Blueprint
// ---------------------------------------------
function IntakeWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    revenueMonthly: "",
    avgOrderValue: "",
    cogsPct: "",
    payrollCount: "",
    adminHoursWeekly: "",
    tools: { stripe: true, square: false, shopify: false, quickbooks: true },
  });

  const num = (v) => (v === "" || isNaN(Number(v)) ? 0 : Number(v));

  const metrics = useMemo(() => {
    const revenue = num(form.revenueMonthly);
    const cogsPct = num(form.cogsPct) / 100; // percent→decimal
    const grossMargin = revenue > 0 ? (1 - cogsPct) * 100 : 0;
    const adminHours = num(form.adminHoursWeekly);
    // Conservative estimate: Bobbi saves 40–60% admin time; assume 45%
    const timeSaved = Math.round(adminHours * 0.45);
    // Value of time: proxy $35/hr for owners; adjust as needed
    const valueOfTime = timeSaved * 35 * 4; // monthly

    // Break‑even analysis for mid tier $299/mo
    const breakeven = valueOfTime >= 299;

    return { revenue, grossMargin, timeSaved, valueOfTime, breakeven };
  }, [form]);

  const NextPrev = () => (
    <div className="mt-6 flex items-center justify-between">
      <Button variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
        Back
      </Button>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => setStep(4)}>
          Skip to Results
        </Button>
        <Button onClick={() => setStep((s) => Math.min(4, s + 1))}>
          {step === 4 ? "Finish" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" /> Try Bobbi’s 3‑minute Intake
        </CardTitle>
        <CardDescription>
          Answer a few plain‑language questions. I’ll translate into a simple plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label>Average monthly revenue ($)</Label>
            <Input
              inputMode="numeric"
              placeholder="e.g., 12000"
              value={form.revenueMonthly}
              onChange={(e) => setForm({ ...form, revenueMonthly: e.target.value })}
            />
          </div>
          <div>
            <Label>Average order value ($)</Label>
            <Input
              inputMode="numeric"
              placeholder="e.g., 45"
              value={form.avgOrderValue}
              onChange={(e) => setForm({ ...form, avgOrderValue: e.target.value })}
            />
          </div>
          <div>
            <Label>Estimated COGS (% of sales)</Label>
            <Input
              inputMode="numeric"
              placeholder="e.g., 40"
              value={form.cogsPct}
              onChange={(e) => setForm({ ...form, cogsPct: e.target.value })}
            />
          </div>
          <div>
            <Label>People on payroll</Label>
            <Input
              inputMode="numeric"
              placeholder="e.g., 3"
              value={form.payrollCount}
              onChange={(e) => setForm({ ...form, payrollCount: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Hours per week on admin (emails, invoices, bookkeeping)</Label>
            <Input
              inputMode="numeric"
              placeholder="e.g., 12"
              value={form.adminHoursWeekly}
              onChange={(e) => setForm({ ...form, adminHoursWeekly: e.target.value })}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="font-medium">Tools you already use</div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {([
              ["stripe", "Stripe"],
              ["square", "Square"],
              ["shopify", "Shopify"],
              ["quickbooks", "QuickBooks"],
            ] as const).map(([key, label]) => (
              <Button
                key={key}
                variant={form.tools[key] ? "default" : "outline"}
                className="justify-start"
                onClick={() => setForm({
                  ...form,
                  tools: { ...form.tools, [key]: !form.tools[key] },
                })}
              >
                <Check className={`mr-2 h-4 w-4 ${form.tools[key] ? "opacity-100" : "opacity-0"}`} /> {label}
              </Button>
            ))}
          </div>
        </div>

        <NextPrev />

        <Separator />

        {/* Mini‑Blueprint */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5"/> Snapshot</CardTitle>
              <CardDescription>Your numbers, translated.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-muted p-3">
                  <div className="text-muted-foreground">Gross margin (est.)</div>
                  <div className="mt-1 text-2xl font-semibold">{metrics.grossMargin.toFixed(0)}%</div>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <div className="text-muted-foreground">Admin time saved</div>
                  <div className="mt-1 text-2xl font-semibold">{metrics.timeSaved}h / wk</div>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <div className="text-muted-foreground">Value of time (mo.)</div>
                  <div className="mt-1 text-2xl font-semibold">${metrics.valueOfTime.toLocaleString()}</div>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <div className="text-muted-foreground">Tier breakeven?</div>
                  <div className={`mt-1 text-2xl font-semibold ${metrics.breakeven ? "text-green-600" : "text-amber-600"}`}>
                    {metrics.breakeven ? "Yes" : "Almost"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Receipt className="h-5 w-5"/> Cash‑flow View</CardTitle>
              <CardDescription>Where money moves, simply.</CardDescription>
            </CardHeader>
            <CardContent style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <RBarChart data={[
                  { name: "Sales", value: Math.max(0, metrics.revenue) },
                  { name: "COGS", value: Math.max(0, Math.round(metrics.revenue * (Number(form.cogsPct || 0)/100))) },
                  { name: "Overhead", value:  Math.max(0,  Math.round(metrics.revenue * 0.18)) },
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RTooltip />
                  <Bar dataKey="value" />
                </RBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          This is an estimate for illustration. Bobbi will refine once connected to your tools.
        </div>
        <Button size="lg" className="group">
          Get my full blueprint <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}

// ---------------------------------------------
// Pricing Cards
// ---------------------------------------------
const pricing = [
  {
    name: "Solo Creator",
    price: 99,
    features: [
      "Invoices & expenses automation",
      "Receipt capture & monthly summary",
      "Simple cash‑flow dashboard",
      "Email support",
    ],
    cta: "Start free trial",
  },
  {
    name: "Small Team",
    price: 299,
    features: [
      "Everything in Solo",
      "Payroll & sales‑tax workflows",
      "Stripe/Square/Shopify integrations",
      "Weekly KPI nudges",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Growth",
    price: 799,
    features: [
      "Dedicated onboarding",
      "Advanced analytics & forecasting",
      "Multi‑entity & inventory",
      "Quarterly CFO sessions",
    ],
    cta: "Talk to us",
  },
];

function PricingSection() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {pricing.map((tier, i) => (
        <Card key={tier.name} className={`${tier.highlighted ? "border-2 border-violet-500 shadow-lg" : ""}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{tier.name}</CardTitle>
              {tier.highlighted && <Badge variant="secondary">Most Popular</Badge>}
            </div>
            <CardDescription>
              <span className="text-4xl font-bold">${tier.price}</span>
              <span className="text-muted-foreground"> / month</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {tier.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" /> {f}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full">{tier.cta}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// ---------------------------------------------
// Testimonials / Case Studies (placeholders)
// ---------------------------------------------
const cases = [
  {
    quote:
      "Before Bobbi, I spent 15 hours a week invoicing and chasing payments. Now it’s 2 hours—and we added a wholesale channel.",
    author: "Rosa — Women‑owned bag studio",
  },
  {
    quote:
      "Bobbi found margin in our menu I didn’t see. We grew weekly orders 32% without hiring more staff.",
    author: "Keisha — Community caterer",
  },
  {
    quote:
      "As an artist, admin drained me. Bobbi turned chaos into rhythm. I finally launched my subscription print club.",
    author: "Miles — Screenprinter & artist",
  },
];

// ---------------------------------------------
// Security & Integrations
// ---------------------------------------------
function SecurityIntegrations() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Security & Trust</CardTitle>
          <CardDescription>No nonsense. Your data, locked down.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-3"><Lock className="mt-0.5 h-4 w-4"/> SOC‑2 principles, encryption at rest & in transit</div>
          <div className="flex items-start gap-3"><Settings className="mt-0.5 h-4 w-4"/> Least‑privilege access; audit trails for every sync</div>
          <div className="flex items-start gap-3"><CreditCard className="mt-0.5 h-4 w-4"/> Read‑only financial connections unless you explicitly enable write actions</div>
          <div className="flex items-start gap-3"><BookOpen className="mt-0.5 h-4 w-4"/> Plain‑language privacy: like your accountant + lawyer had a very careful baby</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Store className="h-5 w-5"/> Connect the tools you use</CardTitle>
          <CardDescription>Plug in or just tell me the numbers—I adapt.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 text-sm">
          {["Stripe","Square","Shopify","QuickBooks","Gusto","WooCommerce","Etsy","PayPal"].map((name) => (
            <div key={name} className="flex items-center justify-between rounded-xl border p-3">
              <span>{name}</span>
              <Badge variant="secondary">Ready</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------
// Main Page
// ---------------------------------------------
export default function BobbiWebsite() {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`rounded-full bg-gradient-to-r ${brand.primary} p-[2px]`}>
              <div className="rounded-full bg-background px-3 py-1 text-sm font-bold">
                Bobbi
              </div>
            </div>
            <Badge variant="secondary" className="hidden md:inline-flex">Back‑Office Bot Buddi</Badge>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#how" className="text-sm text-muted-foreground hover:text-foreground">How it works</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
            <a href="#security" className="text-sm text-muted-foreground hover:text-foreground">Security</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost">Log in</Button>
            <Button onClick={() => setSignupOpen(true)} className="hidden md:inline-flex">
              Get started <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <Section>
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold tracking-tight md:text-6xl"
              >
                Meet <span className={brand.primaryText}>Bobbi</span> —
                <br /> your back‑office, MBA brain,
                <br /> and biggest fan.
              </motion.h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Offload invoices, payroll, taxes, inventory, and compliance. Get plain‑language insights, weekly nudges, and a clear path to growth—so you can focus on your craft.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button size="lg" onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}>
                  Try the intake <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => setSignupOpen(true)}>
                  Watch a 60‑second demo
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4"/> Privacy‑first • Read‑only by default
                </div>
              </div>
              <div className="mt-6 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {["R","K","M","A"].map((i) => (
                    <Avatar key={i} className="h-8 w-8 border">
                      <AvatarFallback>{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Loved by artists, makers, & community businesses.
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border p-4 shadow-lg"
            >
              <Tabs defaultValue="chat">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat"><MessageCircle className="mr-2 h-4 w-4"/>Live Chat</TabsTrigger>
                  <TabsTrigger value="intake"><Sparkles className="mr-2 h-4 w-4"/>Intake</TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="mt-4">
                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-lg">Bobbi demo</CardTitle>
                      <CardDescription>Ask about invoices, payroll, inventory, taxes…</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-xl border bg-background p-4 text-sm">
                        <div className="mb-2 font-medium">You → “How can I stop spending Sundays on invoices?”</div>
                        <div className="rounded-lg bg-muted p-3">
                          Bobbi → “Invoices eat time. I can auto‑generate, send reminders, and reconcile payments from Stripe/Square. Do you send invoices weekly or ad‑hoc?”
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="intake" className="mt-4">
                  <IntakeWizard />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section id="how" className="bg-muted/30">
        <Container>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">How Bobbi works</h2>
            <p className="mt-2 text-muted-foreground">From discovery to done, with corporate‑grade rigor and creator‑friendly warmth.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { icon: <BookOpen className="h-5 w-5"/>, title: "Discovery", text: "Plain‑language intake: where money comes from, where it goes, and what success looks like." },
              { icon: <BarChart className="h-5 w-5"/>, title: "Blueprint", text: "Cash‑flow, margins, compliance calendar, and a prioritized back‑office plan." },
              { icon: <Zap className="h-5 w-5"/>, title: "Automation", text: "Connect Stripe/Square/Shopify/QuickBooks; invoices, payroll, and reconciliations run on rails." },
              { icon: <Users className="h-5 w-5"/>, title: "Coaching", text: "Weekly nudges, monthly reviews, and cheerleading that sounds like a friend—because it is." },
            ].map((s) => (
              <Card key={s.title}>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit flex items-center gap-2">{s.icon}{s.title}</Badge>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{s.text}</CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Intake Anchor */}
      <Section id="intake">
        <Container>
          <IntakeWizard />
        </Container>
      </Section>

      {/* Security + Integrations */}
      <Section id="security" className="bg-muted/30">
        <Container>
          <SecurityIntegrations />
        </Container>
      </Section>

      {/* Case Studies */}
      <Section>
        <Container>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Proof, not promises</h2>
            <p className="mt-2 text-muted-foreground">Real owners. Real time saved. Real growth.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {cases.map((c) => (
              <Card key={c.author}>
                <CardContent className="pt-6">
                  <p className="text-sm">“{c.quote}”</p>
                  <div className="mt-3 text-xs text-muted-foreground">{c.author}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="bg-muted/30">
        <Container>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Simple, fair pricing</h2>
            <p className="mt-2 text-muted-foreground">Cheaper than hiring. Smarter than doing it alone.</p>
          </div>
          <PricingSection />
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Container>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">FAQs</h2>
          </div>
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            <AccordionItem value="item-1">
              <AccordionTrigger>Do I have to connect my financial tools?</AccordionTrigger>
              <AccordionContent>
                No. You can start by just telling me approximate numbers. I’ll still give you a clear plan, then connect tools when you’re ready.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Will you move money or change settings in my accounts?</AccordionTrigger>
              <AccordionContent>
                Not without explicit permission. By default, I connect read‑only to analyze and advise. Any write actions are opt‑in and logged.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do you handle off‑topic or uncomfortable questions?</AccordionTrigger>
              <AccordionContent>
                I stay professional and kind. If a topic isn’t related to your back office, I’ll gently redirect: “Let’s stay on your goals,” or “I don’t feel comfortable with that—can we return to your margins and payroll?”
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t py-10">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-lg font-bold">Bobbi</div>
            <div className="text-sm text-muted-foreground">Your Back‑Office Bot Buddi</div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <a href="#security" className="hover:text-foreground">Privacy</a>
            <a href="#faq" className="hover:text-foreground">Terms</a>
            <span>© {new Date().getFullYear()} Bobbi Labs</span>
          </div>
        </Container>
      </footer>

      {/* Docked Chat */}
      <BobbiChat />

      {/* Signup / Demo Modal */}
      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join the Founders’ Circle</DialogTitle>
            <DialogDescription>
              Early access, discounted pricing, and a human‑guided onboarding.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Your email</Label>
              <Input placeholder="you@studio.com" />
            </div>
            <div>
              <Label>Your business</Label>
              <Input placeholder="e.g., Rosa’s Bag Studio" />
            </div>
            <div>
              <Label>What slows you down most?</Label>
              <Textarea placeholder="Invoices? Payroll? Sales tax? Inventory? Tell Bobbi in your own words." />
            </div>
          </div>
          <DialogFooter>
            <Button>Request invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, CalendarClock, Search, MessageSquare, Sparkles, ArrowRight, Zap, ShieldCheck, Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — WorkFlow AI" },
      { name: "description", content: "Your AI-powered workplace productivity dashboard." },
    ],
  }),
});

const tools = [
  { to: "/email", icon: Mail, title: "Smart Email Generator", desc: "Draft polished emails in any tone — formal, friendly, or persuasive." },
  { to: "/notes", icon: FileText, title: "Meeting Notes Summarizer", desc: "Condense long notes into decisions, action items, and deadlines." },
  { to: "/planner", icon: CalendarClock, title: "AI Task Planner", desc: "Turn your to-do dump into a prioritized, time-blocked schedule." },
  { to: "/research", icon: Search, title: "AI Research Assistant", desc: "Summarize topics or articles and surface key insights." },
  { to: "/chat", icon: MessageSquare, title: "AI Chatbot", desc: "Ask anything — your always-on workplace assistant." },
] as const;

const highlights = [
  { icon: Wand2, label: "Prompt-engineered", text: "Each tool ships with task-specific system prompts tuned for quality output." },
  { icon: Zap, label: "Powered by Lovable AI", text: "Runs on Google Gemini — no API keys, no setup, instant results." },
  { icon: ShieldCheck, label: "Responsible AI", text: "Clear disclaimers, editable outputs, and zero data persistence by default." },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
        <div className="relative max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI Workplace Productivity Suite
          </span>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Automate the busywork. <span className="text-gradient">Focus on what matters.</span>
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            Five AI tools in one dashboard — write emails, summarize meetings, plan your day, research topics, and chat
            with an assistant. All powered by structured prompts and modern AI.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/email"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-95"
            >
              Start with Email Generator <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              Open AI Chat
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Your AI tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.to} to={t.to} className="group">
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-elegant">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{t.title}</CardTitle>
                  <CardDescription>{t.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Open tool <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
              <h.icon className="h-4 w-4" />
            </div>
            <div className="text-sm font-semibold">{h.label}</div>
            <p className="mt-1 text-sm text-muted-foreground">{h.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

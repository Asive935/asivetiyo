import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEM_PROMPTS: Record<string, string> = {
  email: `You are a professional email writing assistant. Generate a complete, ready-to-send email based on the user's brief and the requested tone. Include a clear subject line on the first line as "Subject: ...", then a blank line, then the email body with greeting, body, and sign-off. Be concise, polished, and professional. Adapt the tone (formal, friendly, persuasive, apologetic, etc.) precisely.`,
  notes: `You are a meeting notes summarizer. Given raw meeting notes or transcripts, output well-structured markdown with these sections in this exact order:
## Summary
A 2-4 sentence overview.
## Key Decisions
- Bullet list of decisions made.
## Action Items
- [ ] Owner — Task — Deadline (if mentioned)
## Open Questions
- Bullet list of unresolved items.
Keep it crisp and actionable. Omit a section only if truly nothing applies.`,
  planner: `You are an expert productivity coach and task planner. Given a list of tasks, goals, or a brain-dump, produce a prioritized schedule in clean markdown. Use the Eisenhower matrix mentally (urgent/important) to prioritize. Output:
## Priorities
A short paragraph explaining your prioritization rationale.
## Schedule
A markdown table with columns: Time | Task | Priority (P1/P2/P3) | Est. Duration
Include focused work blocks, short breaks, and buffer time. Keep tasks realistic and grouped by context when possible.`,
  research: `You are an AI research assistant. Given a topic, question, or article text, provide a thorough yet concise analysis in markdown:
## Overview
2-3 sentence high-level summary.
## Key Insights
- 4-6 bullets with the most important points.
## Recommendations / Next Steps
- 3-5 actionable suggestions.
## Caveats
- Note assumptions, knowledge gaps, or where the user should verify with primary sources.
Be objective, cite reasoning, and avoid speculation presented as fact.`,
  chat: `You are a helpful, friendly AI workplace assistant inside a productivity dashboard called "WorkFlow AI". Help users with workplace tasks: drafting messages, brainstorming, explaining concepts, planning, summarizing. Be concise by default, expand when asked. Use markdown formatting. If a request would be better served by another tool in the dashboard (Email Generator, Notes Summarizer, Task Planner, Research Assistant), suggest it.`,
};

const InputSchema = z.object({
  mode: z.enum(["email", "notes", "planner", "research", "chat"]),
  prompt: z.string().min(1).max(20000),
  tone: z.string().max(60).optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(20000),
      }),
    )
    .max(40)
    .optional(),
});

export const runAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI service is not configured." };
    }

    let systemPrompt = SYSTEM_PROMPTS[data.mode];
    if (data.mode === "email" && data.tone) {
      systemPrompt += `\n\nDesired tone: ${data.tone}.`;
    }

    const messages: Array<{ role: string; content: string }> = [
      { role: "system", content: systemPrompt },
    ];
    if (data.history && data.mode === "chat") {
      messages.push(...data.history);
    }
    messages.push({ role: "user", content: data.prompt });

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages,
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          return { ok: false as const, error: "Rate limit reached. Please wait a moment and try again." };
        }
        if (res.status === 402) {
          return { ok: false as const, error: "AI credits exhausted. Please add funds in workspace settings." };
        }
        const text = await res.text();
        console.error("AI gateway error", res.status, text);
        return { ok: false as const, error: "The AI service returned an error. Please try again." };
      }

      const json = await res.json();
      const content: string = json?.choices?.[0]?.message?.content ?? "";
      return { ok: true as const, content };
    } catch (err) {
      console.error("AI request failed", err);
      return { ok: false as const, error: "Network error contacting AI service." };
    }
  });

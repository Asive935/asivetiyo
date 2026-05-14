# WorkFlow AI — AI Workplace Productivity Assistant

An integrated, AI-powered productivity dashboard that helps professionals automate everyday workplace tasks. Built as a single SaaS-style platform with a sidebar dashboard and five focused AI tools, all powered by structured prompts and the Lovable AI Gateway (Google Gemini).

---

## Project Overview

WorkFlow AI is a **single integrated web application** (not multiple separate apps) demonstrating:

- Practical AI implementation in a real-world productivity context
- Strong prompt engineering with task-specific system prompts
- Real-world workplace problem solving (email, meetings, planning, research)
- Responsible AI usage — clear disclaimers and editable outputs
- Modern, clean SaaS-style UI/UX

Each tool lives inside the same dashboard, shares the same design system, and routes through one secure server function (`runAI`) that talks to the Lovable AI Gateway.

---

## Features

1. **Smart Email Generator** (`/email`)
   - Generate complete, ready-to-send emails from a short brief
   - Tone selector: Formal, Friendly, Persuasive, Apologetic, etc.
   - Outputs subject line + body, fully editable

2. **Meeting Notes Summarizer** (`/notes`)
   - Paste raw notes or transcripts
   - Returns structured Markdown: Summary, Key Decisions, Action Items, Open Questions

3. **AI Task Planner** (`/planner`)
   - Turns a brain-dump of tasks into a prioritized, time-blocked schedule
   - Uses Eisenhower-style prioritization with P1/P2/P3 labels

4. **AI Research Assistant** (`/research`)
   - Summarizes any topic, question, or pasted article
   - Returns Overview, Key Insights, Recommendations, and Caveats

5. **AI Chatbot** (`/chat`)
   - General-purpose workplace assistant
   - Maintains conversation history within the session
   - Suggests other dashboard tools when relevant

**Cross-cutting features**
- Modern dashboard with collapsible sidebar navigation
- Fully responsive (mobile → desktop)
- Editable AI outputs with copy-to-clipboard
- Responsible AI disclaimer on every tool
- Loading states, error handling, and rate-limit messaging

---

## Tools Used

**Frontend**
- React 19 + TypeScript
- TanStack Start v1 (SSR + file-based routing) on Vite 7
- Tailwind CSS v4 with semantic design tokens (`src/styles.css`)
- shadcn/ui components + lucide-react icons
- react-markdown for rendering AI output

**Backend / AI**
- TanStack server functions (`createServerFn`) — see `src/lib/ai.functions.ts`
- Zod for input validation
- **Lovable AI Gateway** with `google/gemini-2.5-flash` (no API key setup needed)
- **Lovable Cloud** (managed Supabase) for backend infrastructure

**AI Tools used during development**
- ChatGPT — prompt design and refinement
- Lovable AI — code generation, scaffolding, and the runtime AI engine

---

## Setup Instructions

### Prerequisites
- [Bun](https://bun.sh/) (or Node.js 20+)
- A Lovable project with **Lovable Cloud** enabled (provides the AI gateway key automatically)

### Local development

```bash
# 1. Install dependencies
bun install

# 2. Start the dev server
bun run dev
```

The app runs at `http://localhost:8080`.

### Environment variables

The `.env` file is auto-managed by Lovable Cloud and contains:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

The `LOVABLE_API_KEY` (used server-side by `runAI`) is injected automatically by the Lovable runtime — no manual setup required.

### Project structure

```
src/
  components/        Shared UI (AppSidebar, AIToolPanel, AIDisclaimer, ...)
  lib/ai.functions.ts   Central runAI server function + system prompts
  routes/            File-based routes (index, email, notes, planner, research, chat)
  styles.css         Design tokens (colors, gradients, shadows)
  integrations/supabase/   Auto-generated Lovable Cloud client
```

### Deployment

Click **Publish** inside Lovable. The app is deployed to a `*.lovable.app` URL with SSR enabled on the edge runtime.

---

## Responsible AI

- A disclaimer is shown on every AI tool reminding users that output may be inaccurate and should be reviewed.
- All AI output is **editable** before use — the assistant suggests, the human decides.
- No user input is persisted by default; conversations live only in the current session.
- The `runAI` server function validates and bounds all inputs with Zod and gracefully handles rate-limit (429) and credit (402) errors from the gateway.

---

## Team Members

- _Solo project_ — built by the project owner using Lovable.

(Replace this section with team member names and roles if submitted as a group.)

---

## License

For educational / demonstration purposes.

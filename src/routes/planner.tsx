import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { AIToolPanel } from "@/components/AIToolPanel";

export const Route = createFileRoute("/planner")({
  component: PlannerPage,
  head: () => ({
    meta: [
      { title: "AI Task Planner — WorkFlow AI" },
      { name: "description", content: "Generate prioritized daily and weekly schedules." },
    ],
  }),
});

function PlannerPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={CalendarClock}
        title="AI Task Planner"
        description="Dump your tasks. Get a prioritized, time-blocked schedule."
      />
      <AIToolPanel
        mode="planner"
        inputLabel="Your tasks & goals"
        inputPlaceholder="List tasks, deadlines, energy levels, available hours..."
        buttonLabel="Build my schedule"
        outputTitle="Your schedule"
        examples={[
          "Today, 9am-5pm. Tasks: prep client deck (due tomorrow), 30min team standup, code review 3 PRs, gym, reply to 12 emails, write blog post draft.",
          "Plan my week: ship feature X by Friday, 2 client calls, 1 design review, hiring screens Tue/Thu, focus blocks for deep work.",
        ]}
      />
    </div>
  );
}

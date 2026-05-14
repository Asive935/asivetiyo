import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { AIToolPanel } from "@/components/AIToolPanel";

export const Route = createFileRoute("/notes")({
  component: NotesPage,
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — WorkFlow AI" },
      { name: "description", content: "Turn long meeting notes into decisions, action items, and deadlines." },
    ],
  }),
});

function NotesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={FileText}
        title="Meeting Notes Summarizer"
        description="Paste raw notes or a transcript. Get a structured summary with action items."
      />
      <AIToolPanel
        mode="notes"
        inputLabel="Raw notes or transcript"
        inputPlaceholder="Paste your meeting notes or transcript here..."
        buttonLabel="Summarize"
        outputTitle="Structured summary"
        examples={[
          "Standup 9am — Alice: finished login, blocked on API. Bob: working on dashboard, ETA Friday. Carol: PR review pending. Decided to ship feature flag Monday. Carol to review by EOD.",
        ]}
      />
    </div>
  );
}

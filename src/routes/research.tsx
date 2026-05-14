import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { AIToolPanel } from "@/components/AIToolPanel";

export const Route = createFileRoute("/research")({
  component: ResearchPage,
  head: () => ({
    meta: [
      { title: "AI Research Assistant — WorkFlow AI" },
      { name: "description", content: "Summarize topics and articles with insights and recommendations." },
    ],
  }),
});

function ResearchPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={Search}
        title="AI Research Assistant"
        description="Enter a topic or paste an article. Get insights, recommendations, and caveats."
      />
      <AIToolPanel
        mode="research"
        inputLabel="Topic or article text"
        inputPlaceholder="Type a topic to research, or paste an article to summarize..."
        buttonLabel="Analyze"
        outputTitle="Insights"
        examples={[
          "What are the trade-offs of using server-side rendering vs static generation in 2026?",
          "Summarize the main arguments for and against the four-day work week.",
        ]}
      />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { AIToolPanel } from "@/components/AIToolPanel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/email")({
  component: EmailPage,
  head: () => ({
    meta: [
      { title: "Smart Email Generator — WorkFlow AI" },
      { name: "description", content: "Generate professional emails in any tone with AI." },
    ],
  }),
});

const TONES = ["Formal", "Friendly", "Persuasive", "Apologetic", "Concise", "Enthusiastic"];

function EmailPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        description="Describe what you want to communicate. Pick a tone. Get a polished email."
      />
      <AIToolPanel
        mode="email"
        toneDefault="Formal"
        inputLabel="Email brief"
        inputPlaceholder="Example: Email to my manager asking for a one-week extension on the Q3 report because the data team delayed deliverables."
        buttonLabel="Generate email"
        outputTitle="Generated email"
        renderMarkdown={false}
        examples={[
          "Decline a meeting invite politely and propose async update instead.",
          "Follow up with a client who hasn't responded in 5 days about the proposal.",
          "Thank a teammate for covering for me while I was out sick.",
        ]}
        controls={({ tone, setTone }) => (
          <div className="space-y-1.5">
            <Label className="text-xs">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="w-full sm:w-60">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {TONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}
      />
    </div>
  );
}

import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles, Copy, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

import { runAI } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AIDisclaimer } from "@/components/AIDisclaimer";

interface AIToolPanelProps {
  mode: "email" | "notes" | "planner" | "research";
  inputLabel: string;
  inputPlaceholder: string;
  buttonLabel: string;
  outputTitle: string;
  examples?: string[];
  controls?: (state: { tone: string; setTone: (t: string) => void }) => ReactNode;
  toneDefault?: string;
  renderMarkdown?: boolean;
}

export function AIToolPanel({
  mode,
  inputLabel,
  inputPlaceholder,
  buttonLabel,
  outputTitle,
  examples,
  controls,
  toneDefault,
  renderMarkdown = true,
}: AIToolPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState(toneDefault ?? "");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const callAI = useServerFn(runAI);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter some input first.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const result = await callAI({ data: { mode, prompt, tone: tone || undefined } });
      if (result.ok) {
        setOutput(result.content);
      } else {
        toast.error(result.error);
      }
    } catch (e) {
      toast.error("Request failed. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">{inputLabel}</CardTitle>
          <CardDescription>Provide context. The more specific, the better the result.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {controls?.({ tone, setTone })}
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={inputPlaceholder}
            className="min-h-[260px] resize-y"
            maxLength={20000}
          />
          {examples && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Try an example:</p>
              <div className="flex flex-wrap gap-2">
                {examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(ex)}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs hover:bg-accent"
                  >
                    {ex.length > 50 ? ex.slice(0, 50) + "…" : ex}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">{prompt.length} / 20000</span>
            <div className="flex gap-2">
              {prompt && (
                <Button variant="ghost" size="sm" onClick={() => { setPrompt(""); setOutput(""); }}>
                  <RotateCcw className="mr-1 h-3.5 w-3.5" /> Clear
                </Button>
              )}
              <Button onClick={handleSubmit} disabled={loading} className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {buttonLabel}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="text-base">{outputTitle}</CardTitle>
            <CardDescription>Editable — copy or refine as needed.</CardDescription>
          </div>
          {output && (
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="mr-1 h-3.5 w-3.5" /> : <Copy className="mr-1 h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {output ? (
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="min-h-[260px] resize-y font-mono text-xs"
            />
          ) : (
            <div className="flex min-h-[260px] items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
              {loading ? (
                <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Generating…</span>
              ) : (
                "Output will appear here."
              )}
            </div>
          )}
          {output && renderMarkdown && (
            <div className="rounded-md border border-border bg-muted/30 p-4 text-sm prose prose-sm max-w-none dark:prose-invert">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preview</p>
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          )}
          <AIDisclaimer />
        </CardContent>
      </Card>
    </div>
  );
}

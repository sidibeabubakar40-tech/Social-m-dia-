import { AGENT_PROMPTS } from "./prompts";
import type { AgentResult, CreativeOutput, CopyOutput, PlanOutput, StrategyOutput, WorkflowInput, WorkflowOutput } from "./types";

async function callModel<T>(system: string, payload: unknown): Promise<{ output: T; mode: "ai" | "demo" }> {
  const key = process.env.AI_API_KEY;
  const url = process.env.AI_API_URL;

  if (!key || !url) return { output: demoOutput(system, payload) as T, mode: "demo" };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.AI_MODEL || "default",
      messages: [
        { role: "system", content: system },
        { role: "user", content: JSON.stringify(payload) }
      ],
      temperature: 0.7
    }),
    cache: "no-store"
  });

  if (!response.ok) throw new Error(`AI provider error: ${response.status}`);
  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("AI provider returned no content.");

  return { output: JSON.parse(text.replace(/^\`\`\`json\s*/,"").replace(/\s*\`\`\`$/,"")), mode: "ai" };
}

function demoOutput(system: string, payload: any) {
  if (system === AGENT_PROMPTS.strategist) return {
    objective: payload.objective || "Développer la visibilité et l'engagement",
    audience: payload.audience || "Audience cible de la marque",
    pillars: ["Éducation", "Preuve sociale", "Coulisses"],
    angle: "Apporter une valeur concrète avec une identité de marque humaine.",
    kpis: ["Engagement", "Portée", "Clics"]
  };
  if (system === AGENT_PROMPTS.copywriter) return {
    hook: "Une idée simple peut changer la façon dont votre audience voit votre marque.",
    caption: `${payload.brief}\n\nVoici une approche simple, utile et pensée pour votre audience.`,
    cta: "Dites-nous ce que vous en pensez en commentaire.",
    hashtags: ["#SIDIBESTUDIO", "#SocialMedia", "#Communication", "#Marketing", "#CotedIvoire"]
  };
  if (system === AGENT_PROMPTS.creative) return {
    format: payload.platform === "tiktok" ? "Vidéo verticale 9:16" : "Post social 4:5",
    concept: "Visuel premium, humain et centré sur une idée forte.",
    visualDirection: "Sujet principal net, hiérarchie typographique simple, contraste élevé et identité SIDIBE.",
    shotList: ["Plan d'ouverture avec hook", "Plan principal produit/service", "Preuve ou détail", "CTA final"]
  };
  return {
    recommendedDate: payload.publishDate || new Date().toISOString().slice(0, 10),
    recommendedTime: payload.platform === "tiktok" ? "19:00" : "18:30",
    reason: "Créneau de démonstration. À remplacer par une recommandation basée sur les analytics réels après connexion des comptes."
  };
}

export async function runSocialWorkflow(input: WorkflowInput): Promise<WorkflowOutput> {
  const strategyResult = await callModel<StrategyOutput>(AGENT_PROMPTS.strategist, input);
  const copyResult = await callModel<CopyOutput>(AGENT_PROMPTS.copywriter, { ...input, strategy: strategyResult.output });
  const creativeResult = await callModel<CreativeOutput>(AGENT_PROMPTS.creative, { ...input, strategy: strategyResult.output, copy: copyResult.output });
  const planResult = await callModel<PlanOutput>(AGENT_PROMPTS.planner, { ...input, strategy: strategyResult.output, creative: creativeResult.output });

  return {
    strategy: strategyResult.output,
    copy: copyResult.output,
    creative: creativeResult.output,
    plan: planResult.output,
    approvalRequired: true,
    publisherStatus: "disabled_until_oauth"
  };
}

"use client";

import { useState } from "react";

const platforms = ["instagram","facebook","tiktok","linkedin"] as const;

export default function ContentPage() {
  const [brief, setBrief] = useState("");
  const [platform, setPlatform] = useState<(typeof platforms)[number]>("instagram");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function generate() {
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await fetch("/api/ai/workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief, platform, objective: "Développer visibilité et engagement" })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur");
      setResult(data.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally { setLoading(false); }
  }

  return <main className="modulePage">
    <a href="/" className="back">← Dashboard</a>
    <header className="moduleHeader">
      <div><p className="eyebrow">SIDIBE SOCIAL AI · WORKFLOW</p><h1>Créer du contenu</h1><p>Brief → stratégie → copy → créatif → planning → validation.</p></div>
      <span className="workflowBadge">Publisher : désactivé</span>
    </header>

    <section className="moduleGrid">
      <div className="moduleCard">
        <h2>Brief de campagne</h2>
        <p>Décris ce que tu veux communiquer. Les agents transforment ensuite le brief en contenu structuré.</p>
        <textarea value={brief} onChange={e=>setBrief(e.target.value)} placeholder="Ex. Présenter notre nouvelle offre avec un ton premium, simple et proche du public ivoirien." />
        <div className="platformRow">{platforms.map(p=><button key={p} className={platform===p?"platformBtn active":"platformBtn"} onClick={()=>setPlatform(p)}>{p}</button>)}</div>
        <button className="primaryAction" onClick={generate} disabled={!brief.trim() || loading}>{loading ? "Les agents travaillent..." : "Lancer le workflow IA"}</button>
        {error && <p className="errorBox">{error}</p>}
      </div>

      <div className="moduleCard">
        <h2>Chaîne des agents</h2>
        <div className="pipeline">
          {["Stratège","Copywriter","Créatif","Planner","Validation humaine","Publisher"].map((name,i)=><div className="pipelineStep" key={name}><span>{String(i+1).padStart(2,"0")}</span><div><b>{name}</b><small>{name==="Validation humaine"?"Obligatoire avant publication":name==="Publisher"?"Bloqué sans OAuth":"Prêt"}</small></div></div>)}
        </div>
      </div>
    </section>

    {result && <section className="moduleCard resultCard">
      <div className="resultHead"><div><p className="eyebrow">PROPOSITION GÉNÉRÉE</p><h2>Contenu prêt à valider</h2></div><span className="approval">Validation requise</span></div>
      <div className="resultGrid">
        <article><h3>01 · Stratégie</h3><b>{result.strategy.objective}</b><p>{result.strategy.angle}</p><small>Piliers : {result.strategy.pillars.join(" · ")}</small></article>
        <article><h3>02 · Copywriting</h3><b>{result.copy.hook}</b><p>{result.copy.caption}</p><strong>{result.copy.cta}</strong><small>{result.copy.hashtags.join(" ")}</small></article>
        <article><h3>03 · Créatif</h3><b>{result.creative.format}</b><p>{result.creative.concept}</p><small>{result.creative.visualDirection}</small></article>
        <article><h3>04 · Planning</h3><b>{result.plan.recommendedDate} · {result.plan.recommendedTime}</b><p>{result.plan.reason}</p></article>
      </div>
    </section>}
  </main>
}

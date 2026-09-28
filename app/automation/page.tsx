import { Sparkles, Clock3, ShieldCheck } from "lucide-react";

const rules=[
 ["Génération quotidienne","Chaque matin, proposer 3 idées de contenus.",Sparkles],
 ["Rappel de validation","Notifier avant chaque publication à valider.",Clock3],
 ["Publication sécurisée","Publier uniquement après OAuth et validation humaine.",ShieldCheck]
] as const;

export default function AutomationPage(){
 return <div className="modulePage"><header className="moduleHeader"><div><span>ORCHESTRATION</span><h1>Automatisations</h1><p>Déclenche les agents selon des règles contrôlées.</p></div></header>
 <div className="automationGrid">{rules.map(([title,text,Icon])=><section className="panel rule" key={title}><div className="statIcon"><Icon/></div><h2>{title}</h2><p>{text}</p><span className="online">Prêt à configurer</span></section>)}</div></div>
}
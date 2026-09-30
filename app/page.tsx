"use client";

import { useState } from "react";
import { BarChart3, CalendarDays, Camera, ChevronRight, Clock3, FileText, Home, Inbox, BriefcaseBusiness, MessageCircle, MoreHorizontal, Plus, Settings, Sparkles, Target, Users, Video, Wand2 } from "lucide-react";

const nav = [
  ["Dashboard",Home],["Contenus",FileText],["Calendrier",CalendarDays],["Messages",MessageCircle],
  ["Analytics",BarChart3],["Bibliothèque",Inbox],["Automatisations",Sparkles],["Comptes sociaux",Users]
] as const;

const agents = [
  ["Stratège","Planifie la stratégie et les piliers éditoriaux.","Actif"],
  ["Copywriter","Crée hooks, légendes et appels à l’action.","Actif"],
  ["Créatif","Prépare concepts visuels et briefs.","Actif"],
  ["Planner","Optimise le calendrier et les horaires.","Actif"],
  ["Publisher","Publie via les APIs officielles.","En attente"],
  ["Community","Classe les messages et prépare des réponses.","Actif"],
  ["Analytics","Analyse KPI, portée et engagement.","Actif"],
  ["Optimizer","Propose des optimisations à partir des données.","Actif"]
];

const posts = [
  ["Instagram","Nouveau contenu de marque","Aujourd’hui · 18:30","À valider"],
  ["Facebook","Présentation de notre offre","Demain · 12:00","Planifié"],
  ["TikTok","Vidéo courte — coulisses","Jeudi · 19:00","Brouillon"]
];

export default function HomePage(){
  const [active,setActive]=useState("Dashboard");
  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brandMark">S</div><div><b>SIDIBE</b><span>Social AI</span></div></div>
      <div className="workspace">WORKSPACE<strong>SIDIBE STUDIO</strong></div>
      <nav>{nav.map(([label,Icon])=><button key={label} className={active===label?"navItem active":"navItem"} onClick={()=>setActive(label)}><Icon size={18}/><span>{label}</span>{label==="Messages"&&<em>7</em>}</button>)}</nav>
      <div className="sidebarBottom"><button className="navItem"><Settings size={18}/><span>Paramètres</span></button><div className="user"><div className="avatar">AS</div><div><b>Aboubakar Sidibe</b><span>Administrateur</span></div></div></div>
    </aside>

    <section className="content">
      <header className="topbar"><div><p className="eyebrow">AGENT IA · {active.toUpperCase()}</p><h1>{active}</h1></div><div className="topActions"><button className="iconBtn"><Inbox size={18}/></button><button className="primary"><Plus size={17}/> Créer du contenu</button></div></header>

      <div className="notice"><div className="noticeIcon"><Sparkles size={18}/></div><div><b>Les agents IA sont prêts.</b><span>Le Publisher reste désactivé tant qu’aucun compte social n’est autorisé.</span></div><ChevronRight size={18}/></div>

      <div className="stats">
        <Stat title="Publications planifiées" value="24" change="+12%" icon={CalendarDays}/>
        <Stat title="À valider" value="08" change="+3" icon={Clock3}/>
        <Stat title="Engagement moyen" value="6,8%" change="+0,9%" icon={Target}/>
        <Stat title="Portée estimée" value="48,2K" change="+18%" icon={BarChart3}/>
      </div>

      <div className="grid2">
        <section className="panel"><div className="panelHead"><div><h2>Publications à venir</h2><p>Les prochains contenus du calendrier.</p></div><button className="ghost">Voir tout</button></div>
          <div className="postList">{posts.map((p,i)=><div className="post" key={i}><Platform name={p[0]}/><div className="postInfo"><b>{p[1]}</b><span>{p[2]}</span></div><span className="status">{p[3]}</span><MoreHorizontal size={18}/></div>)}</div>
        </section>
        <section className="panel"><div className="panelHead"><div><h2>Calendrier éditorial</h2><p>Vue des 7 prochains jours.</p></div><CalendarDays size={19}/></div>
          <div className="week">{["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map((d,i)=><div className="day" key={d}><span>{d}</span><b>{28+i}</b><i className={i<4?"dot":"dot muted"}></i></div>)}</div>
          <div className="calendarCard"><span>18:30 · Instagram</span><b>Conseil de la semaine</b><small>Préparé par Copywriter IA</small></div>
        </section>
      </div>

      <section className="panel"><div className="panelHead"><div><h2>Les 8 agents IA</h2><p>Chaque agent possède une mission précise dans la chaîne de production.</p></div><button className="ghost">Configurer</button></div>
        <div className="agentGrid">{agents.map(([name,desc,status])=><div className="agent" key={name}><div className="agentIcon"><Wand2 size={17}/></div><div><b>{name}</b><p>{desc}</p></div><span className={status==="Actif"?"online":"waiting"}>{status}</span></div>)}</div>
      </section>

      <section className="panel accounts"><div className="panelHead"><div><h2>Comptes sociaux</h2><p>Connexion par OAuth officiel uniquement. Aucun mot de passe n’est stocké.</p></div><button className="ghost">Gérer les comptes</button></div>
        <div className="accountGrid"><Account icon={<Camera size={19}/>} name="Instagram"/><Account icon={<span className="fb">f</span>} name="Facebook"/><Account icon={<Video size={19}/>} name="TikTok"/><Account icon={<BriefcaseBusiness size={19}/>} name="LinkedIn"/></div>
      </section>
    </section>
  </main>;
}

function Stat({title,value,change,icon:Icon}:{title:string,value:string,change:string,icon:any}){return <div className="stat"><div className="statIcon"><Icon size={18}/></div><span>{title}</span><strong>{value}</strong><small>{change} <em>vs période précédente</em></small></div>}
function Platform({name}:{name:string}){return <span className="platformBadge">{name==="Instagram"?<Camera size={16}/>:name==="LinkedIn"?<BriefcaseBusiness size={16}/>:<Video size={16}/>}</span>}
function Account({icon,name}:{icon:React.ReactNode,name:string}){return <div className="account"><div className="accountIcon">{icon}</div><div><b>{name}</b><span>Non connecté</span></div><button>Connecter</button></div>}
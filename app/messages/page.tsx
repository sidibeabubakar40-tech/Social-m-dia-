import { MessageCircle, Sparkles } from "lucide-react";

const messages=[
  ["Instagram","Bonjour, pouvez-vous m’envoyer les tarifs ?"],
  ["Facebook","Votre offre est-elle disponible à Abidjan ?"],
  ["LinkedIn","J’aimerais échanger sur votre service."]
];

export default function MessagesPage(){
 return <div className="modulePage"><header className="moduleHeader"><div><span>COMMUNITY</span><h1>Messages</h1><p>Centralise les conversations et prépare les réponses avec l’IA.</p></div></header>
 <section className="panel"><div className="messageList">{messages.map((m,i)=><div className="message" key={i}><div className="messageIcon"><MessageCircle size={17}/></div><div><b>{m[0]}</b><p>{m[1]}</p><span>À traiter</span></div><button className="ghost"><Sparkles size={14}/> Suggérer</button></div>)}</div></section></div>
}
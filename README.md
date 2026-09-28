# Social Media AI Agent

Agent IA de gestion des réseaux sociaux de SIDIBE STUDIO.


## Persistance de production

Le stockage des contenus utilise maintenant Prisma + PostgreSQL. Les données ne sont plus conservées uniquement en mémoire.

### Configuration

1. Créer une base PostgreSQL.
2. Copier `.env.example` vers `.env.local`.
3. Renseigner `DATABASE_URL`.
4. Installer les dépendances avec `npm install`.
5. Initialiser le schéma avec `npm run db:push`.
6. Lancer l'application avec `npm run dev`.

### Modèle de données

Le schéma `prisma/schema.prisma` couvre :
- contenus sociaux
- comptes sociaux et métadonnées OAuth
- campagnes
- exécutions des agents IA
- validations humaines
- messages
- snapshots analytics

Les secrets OAuth restent côté serveur. Aucun mot de passe de réseau social ne doit être demandé ou stocké.

# Modèle de données prévu

## users
Utilisateur et rôles.

## workspaces
Espace SIDIBE STUDIO.

## social_accounts
- id
- workspace_id
- platform
- external_account_id
- display_name
- encrypted_access_token
- token_expires_at
- scopes
- status

## posts
- id
- workspace_id
- title
- caption
- media_url
- status
- scheduled_at
- created_by

## post_targets
Association d'un contenu avec une plateforme.

## analytics_daily
KPI agrégés par compte et par jour.

## messages
Messages entrants et statut de traitement.

## agent_runs
Historique des exécutions des agents IA.

Les secrets et tokens ne doivent jamais être commités dans Git.
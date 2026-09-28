# Sécurité

- Aucun mot de passe de réseau social n'est demandé.
- OAuth officiel uniquement.
- Les secrets restent dans les variables d'environnement ou un secret manager.
- Les tokens doivent être chiffrés au repos.
- Les logs ne doivent pas contenir de tokens.
- Les scopes OAuth doivent être minimaux.
- Toute action de publication doit être journalisée.
- Les réponses sensibles de Community nécessitent une validation humaine.
- Le Publisher est désactivé par défaut.
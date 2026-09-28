# Connexion des comptes sociaux

La connexion sera faite uniquement via OAuth officiel.

Plateformes prévues :
- Instagram
- Facebook
- TikTok
- LinkedIn

Règles :
1. Ne jamais demander ni stocker un mot de passe social.
2. Les tokens restent côté serveur dans des secrets d’environnement.
3. Utiliser les scopes minimum nécessaires.
4. Prévoir révocation et déconnexion.
5. Le Publisher reste désactivé avant autorisation.

IMPORTANT : ne connecte aucun compte tant que l’interface OAuth de cette application n’est pas activée et testée.
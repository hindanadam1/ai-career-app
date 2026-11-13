# AI Career App

Application web pour accompagner la préparation d'une candidature : création d'un CV, rédaction d'une lettre de motivation, préparation d'entretien et historique personnel.

## Fonctionnalités

- Inscription et connexion à un espace personnel.
- Création d'un CV à partir des informations du candidat.
- Génération d'une première version de lettre de motivation selon le poste, l'entreprise et le profil.
- Préparation à l'entretien avec des questions associées au poste et au niveau choisi.
- Consultation de l'historique des documents créés.

Les textes sont actuellement produits à partir de gabarits et de questions prédéfinies. L'application ne fait pas appel à un modèle de langage.

## Technologies

| Partie | Technologie | Utilisation |
| --- | --- | --- |
| Frontend | React, JavaScript, React Router, Vite, CSS | Écrans, navigation et formulaires |
| Backend | Node.js, Express | Authentification, génération des contenus et historique |
| Données | MySQL avec `mysql2` | Comptes et documents |

## Routes

Pages React :

- `/` : connexion
- `/register` : inscription
- `/dashboard` : tableau de bord
- `/cv` : création de CV
- `/lettre` : lettre de motivation
- `/entretien` : préparation d'entretien
- `/historique` : documents enregistrés

API Express sur `http://localhost:3001` :

- `POST /api/register`, `POST /api/login`
- `POST /api/ai/generate-cv`, `POST /api/ai/generate-letter`
- `POST /api/ai/generation-entretien`
- `GET /api/documents/:userId`

## Lancement local

Prérequis : Node.js, MySQL et une base `ai_career` contenant les tables `users` et `documents`.

1. Configure `backend/.env` avec les paramètres de connexion MySQL, en t'aidant de `backend/.env.example`.
2. Depuis la racine, installe les dépendances partagées du projet :

   ```powershell
   npm install
   ```

3. Dans un terminal, installe les dépendances et démarre Express :

   ```powershell
   cd backend
   npm install
   node index.js
   ```

4. Dans un autre terminal, démarre le frontend :

   ```powershell
   cd frontend
   npm install
   npm run dev -- --host 127.0.0.1
   ```

5. Ouvre l'adresse locale affichée par Vite, habituellement `http://127.0.0.1:5173`.

Le dépôt ne fournit pas de script de création de la base de données. Les tables doivent déjà exister dans MySQL.

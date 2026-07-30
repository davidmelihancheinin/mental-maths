# Calcul mental — Consulting

Application d'entraînement au calcul mental orientée conseil en stratégie.
Aucune dépendance, aucun build : un seul fichier HTML autonome.

## Utilisation

Double-clique sur `Calcul Mental (standalone).html` — c'est le fichier de
référence (charte crème/bordeaux, succès à débloquer, classement de
groupe). L'app fonctionne hors-ligne dès le deuxième chargement et enregistre
records et statistiques dans le navigateur (`localStorage`).

## L'installer sur le téléphone (pour le métro)

L'app est une PWA. Pour l'avoir en icône sur l'écran d'accueil et 100 % hors-ligne,
il faut d'abord la publier sur un hébergement HTTPS. Le fichier de référence
s'appelle `Calcul Mental (standalone).html` (pas `index.html`) — c'est pour ça
que le dossier contient aussi un petit **`index.html`** qui ne fait que
rediriger automatiquement vers ce fichier : sans lui, l'URL « propre » du site
(sans nom de fichier à la fin) affiche une erreur 404 sur GitHub Pages.

**Publier avec GitHub Pages (aucune ligne de commande nécessaire) :**

1. Sur [github.com](https://github.com), crée un compte si besoin, puis
   « New repository » (bouton vert) → nomme-le (ex. `calcul-mental`) → **Public**
   → Create repository.
2. Sur la page du repo → **Add file → Upload files** → glisse-dépose **tous**
   les fichiers du dossier (`index.html`, `Calcul Mental (standalone).html`,
   `manifest.webmanifest`, `sw.js`, `icon.svg`) → Commit changes.
3. **Settings** (onglet en haut du repo) → **Pages** (menu de gauche) →
   sous « Build and deployment » choisis **Source : Deploy from a branch**,
   branche **main**, dossier **/ (root)** → Save.
4. Patiente ~1 minute, puis recharge la page Settings → Pages : l'URL du site
   apparaît en haut, du type `https://ton-pseudo-github.github.io/calcul-mental/`.
   C'est cette URL (sans rien après) qu'il faut ouvrir — elle redirige
   automatiquement vers l'app grâce à `index.html`.
5. Ouvre cette URL sur le téléphone.
6. **iOS** : Partager → « Sur l'écran d'accueil ». **Android** : menu → « Installer l'application ».

Le service worker (`sw.js`) met tout en cache : plus besoin de réseau ensuite.
Si tu modifies un fichier plus tard, retourne dans **Add file → Upload files**
pour le remplacer — GitHub Pages republie automatiquement en ~1 minute.

## Ce que contient l'app

**Entraînement** — séries chronométrées (60 s par calcul). Une erreur ou un
dépassement du chrono arrête la série.

| Section | Contenu |
|---|---|
| Opérations de base | addition, soustraction, multiplication, division |
| Pourcentages | calculs, hausses, baisses, variations |
| Fractions et décimales | conversions et simplifications |
| Approximations | estimer vite, ordres de grandeur |
| Formules business | revenu, profit, marge, croissance/CAGR, part de marché, seuil de rentabilité, cash-flow actualisé |
| Market sizing | approche ROLS, volume et valeur |
| Études de cas | mini-cas chiffrés type entretien |
| Techniques avancées | ×5/×25/×50, décomposition, croissance composée |
| Exercices mixtes | tous les types en aléatoire, pour la rapidité |
| Scénarios d'entretien | cas complets façon entretien |

**Correction** — à chaque erreur, la décomposition complète du calcul tel qu'il
fallait le mener de tête, étape par étape, avec un lien vers la leçon associée.

**Leçons** — 14 fiches : ancres du pourcentage, commutativité, dictionnaire
fractions ↔ %, distributivité, arrondi-soustraction, différence de carrés,
raccourcis (×5, ×9, ×11, ×25…), division par ancrages, ratio → %, pièges des
variations, règle de 72, ordres de grandeur, vérification d'un résultat,
méthode en entretien.

**Progression** — record de série par section, taux de réussite,
temps moyen par bonne réponse, historique des 30 dernières séries.

**Succès** — 17 badges à débloquer (bronze/argent/or) : longueur de série,
volume de calculs résolus, vitesse moyenne, plus deux succès sociaux liés au
classement de groupe (créer un compte et rejoindre le classement, prendre la
tête d'une section ou du classement général).

**Compte & classement du groupe** — toujours visible en bas de l'écran
Progression, juste sous les succès (voir section suivante).

## Compte et classement partagé entre plusieurs personnes (optionnel)

Par défaut, chaque personne qui ouvre l'app a ses stats isolées dans son
navigateur, sans compte. Pour comparer les scores d'un groupe, l'app se
connecte à un projet [Firebase](https://firebase.google.com) partagé —
gratuit pour ce volume d'usage. Chacun crée un compte (pseudo + email +
mot de passe) depuis l'onglet **Profil → Compte & classement** :

- Le **pseudo** est ce que tout le monde voit dans le classement.
- L'**email** ne sert qu'à récupérer son mot de passe (lien « mot de passe
  oublié » sur l'écran de connexion) — il n'est jamais affiché aux autres
  joueurs et n'apparaît dans aucun classement.
- Le classement liste uniquement des **pseudos et des résultats** (série la
  plus longue, temps moyen par calcul). Les mots de passe ne quittent jamais
  Firebase Authentication : ils ne sont stockés ni lisibles nulle part dans
  l'app, ni par les autres comptes, ni par toi.

Pas de config = le classement affiche juste « pas encore configuré », le reste
de l'app fonctionne normalement (aucune dépendance obligatoire).

**Mise en place (une fois, ~10 minutes) :**

1. Va sur [console.firebase.google.com](https://console.firebase.google.com), connecte-toi avec un compte Google.
2. Si le projet n'existe pas encore : « Ajouter un projet » → nomme-le (ex. `calcul-mental`)
   → tu peux désactiver Google Analytics → Créer. S'il existe déjà, ouvre-le simplement.
3. En haut à gauche, clique sur **« Rechercher des produits »** et tape `Authentication`
   (dans la version actuelle de la console, Authentication n'est plus dans un menu « Build » mais
   rangé dans la catégorie **Sécurité** du menu de gauche — la barre de recherche fonctionne
   dans tous les cas). Clique sur **Authentication** → si c'est la première fois, bouton
   **« Get started »**.
   - Onglet **Sign-in method** → clique sur **Email/Password** dans la liste des fournisseurs
     → active le premier interrupteur → **Enregistrer**.
   - Puis **Settings** (⚙️ en haut de la page Authentication — pas les paramètres généraux du
     projet, qui n'ont pas ce réglage) → onglet **Authorized domains** → **Add domain** → ajoute
     le domaine de ton site (juste le nom, ex. `tonpseudo.github.io`, sans `https://` ni chemin).
     Sans cette étape, toute connexion/inscription échoue avec `auth/unauthorized-domain` une
     fois le site publié, même si le reste est bien configuré (`localhost` y est déjà par défaut,
     ce qui explique que les tests en local passent avant que cette étape soit faite).
4. Recherche `Firestore Database` de la même façon → « Créer une base de données ».
   - Choisis une région proche (ex. `eur3 (europe-west)`).
   - Démarre en **mode production**.
5. Onglet **Règles** de Firestore → remplace tout par ceci → **Publier** :
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {

       // pseudo -> uid, pour garantir l'unicité des pseudos
       match /usernames/{pseudoId} {
         allow read: if true;
         allow create: if request.auth != null
                       && request.auth.uid == request.resource.data.uid
                       && request.resource.data.keys().hasOnly(['uid']);
         allow update, delete: if false;
       }

       // profil public minimal : uid -> pseudo
       match /players/{uid} {
         allow read: if true;
         allow create: if request.auth != null && request.auth.uid == uid
                       && request.resource.data.keys().hasOnly(['pseudo','createdAt'])
                       && request.resource.data.pseudo is string
                       && request.resource.data.pseudo.size() > 0 && request.resource.data.pseudo.size() <= 24;
         allow update, delete: if false;
       }

       // journal brut de toutes les parties (fil "activité récente")
       match /runs/{runId} {
         allow read: if true;
         allow create: if request.auth != null
                       && request.resource.data.uid == request.auth.uid
                       && request.resource.data.keys().hasOnly(['uid','pseudo','cat','streak','reason','avgTime','ts'])
                       && request.resource.data.pseudo is string
                       && request.resource.data.pseudo.size() > 0 && request.resource.data.pseudo.size() <= 24
                       && request.resource.data.cat is string && request.resource.data.cat.size() <= 20
                       && request.resource.data.streak is int && request.resource.data.streak >= 0 && request.resource.data.streak <= 999
                       && request.resource.data.reason in ['wrong','timeout']
                       && request.resource.data.ts == request.time;
         allow update, delete: if false;
       }

       // meilleure série de chaque joueur, par section (alimente le classement)
       match /bests/{docId} {
         allow read: if true;
         allow write: if request.auth != null
                      && request.auth.uid == request.resource.data.uid
                      && docId == request.resource.data.uid + '_' + request.resource.data.cat
                      && request.resource.data.keys().hasOnly(['uid','pseudo','cat','streak','avgTime','ts'])
                      && request.resource.data.pseudo is string
                      && request.resource.data.pseudo.size() > 0 && request.resource.data.pseudo.size() <= 24
                      && request.resource.data.cat is string && request.resource.data.cat.size() <= 20
                      && request.resource.data.streak is int && request.resource.data.streak >= 0 && request.resource.data.streak <= 999
                      && request.resource.data.ts == request.time;
         allow delete: if false;
       }
     }
   }
   ```
   Ces règles rendent chaque partie **infalsifiable** : tout le monde peut lire
   le classement, mais personne ne peut écrire sous l'identité d'un autre
   compte (`request.auth.uid` doit toujours correspondre au document modifié),
   ni modifier ou effacer les scores de quelqu'un d'autre — ni même les siens
   une fois enregistrés (`runs`), sauf pour améliorer son propre record
   (`bests`, réservé au propriétaire du compte).
6. Retour à la page d'accueil du projet (icône maison) → icône **`</>`** (ajouter une app Web).
   - Nomme-la, ne coche pas Firebase Hosting → Enregistrer l'application.
   - Copie l'objet `firebaseConfig` qui s'affiche.
7. Colle cet objet dans `Calcul Mental (standalone).html`, au tout début du bloc
   `CLASSEMENT PARTAGÉ (Firebase)` juste avant le script principal — remplace
   les 6 valeurs `"REMPLACE_MOI"` par les tiennes. Republie le fichier là où
   l'app est hébergée. N'oublie pas l'ajout du domaine dans **Authorized
   domains** (étape 3 ci-dessus) une fois l'app publiée sur son URL définitive.

La clé `apiKey` n'est pas secrète : elle est destinée à être visible côté client,
la sécurité vient des règles Firestore collées à l'étape 5 et de Firebase
Authentication (qui gère lui-même le stockage sécurisé des mots de passe).

**Classement général** — chaque section (Opérations de base, Pourcentages,
Multiplications…) où au moins une personne a joué produit un classement par
meilleure série (temps moyen départagé en cas d'égalité). Dans chaque section,
la 1ʳᵉ place rapporte 10 points, la 2ᵉ 9, etc. (minimum 1 point). Le
« Général » additionne les points de chacun sur toutes les sections où il/elle
a un résultat — un onglet dans l'écran Progression permet de basculer entre le
général et chaque section.

**Fonctionnement hors-ligne :** une partie se joue et s'enregistre toujours en
local sans réseau (comme avant), y compris sans être connecté. Si tu es
connecté, le résultat est mis en file d'attente et envoyé vers Firebase dès
qu'une connexion est détectée — utile puisque le métro coupe le réseau en
cours de trajet. Se connecter/s'inscrire demande en revanche une connexion
au moment de l'opération (comme toute authentification).

## Tolérances

Les calculs « exacts » (multiplications, fractions) exigent la valeur juste.
Les calculs d'estimation acceptent une marge, affichée sous chaque question :
divisions ± 1 %, pourcentages non entiers ± 0,5 %, ratios et variations
± 0,5 point, market sizing ± 2 %, croissance composée ± 6 %.

C'est volontaire : en entretien on annonce « environ 394 », pas 393,79.

## Raccourcis clavier (desktop)

Chiffres · `,` ou `.` décimale · `-` signe · `Retour arrière` effacer ·
`Entrée` valider · `Échap` quitter la série.

## Structure

```
Calcul Mental (standalone).html   app complète (UI + moteur de calcul + leçons + succès + classement)
index.html                        redirige vers le fichier ci-dessus (nécessaire pour l'URL propre de GitHub Pages)
manifest.webmanifest              métadonnées PWA
sw.js                              cache hors-ligne
icon.svg                           icône (charte crème/bordeaux)
```

Pour ajouter un type de calcul : une entrée dans `GENS` (elle retourne l'énoncé,
la réponse, la tolérance et les étapes de décomposition), puis référence son nom
dans le tableau `g` du mode voulu dans `CATS`.

**Typographie** : la police Inter est chargée depuis Google Fonts (lien
`<link>` dans le `<head>`). Sans réseau au tout premier chargement, l'app
retombe sur la police système — purement cosmétique, aucune fonctionnalité
n'en dépend.

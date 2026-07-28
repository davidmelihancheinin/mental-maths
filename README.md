# Calcul mental — Consulting

Application d'entraînement au calcul mental orientée conseil en stratégie.
Aucune dépendance, aucun build : un seul fichier HTML autonome.

## Utilisation

Double-clique sur `Calcul Mental (standalone).html` — c'est le fichier de
référence (charte crème/bordeaux, succès à débloquer, classement de
groupe). L'app fonctionne hors-ligne dès le deuxième chargement et enregistre
records et statistiques dans le navigateur (`localStorage`).

## L'installer sur le téléphone (pour le métro)

L'app est une PWA. Pour l'avoir en icône sur l'écran d'accueil et 100 % hors-ligne :

1. Publie le dossier sur un hébergement HTTPS (GitHub Pages, Netlify, Vercel — glisser-déposer suffit).
2. Ouvre l'URL sur le téléphone.
3. **iOS** : Partager → « Sur l'écran d'accueil ». **Android** : menu → « Installer l'application ».

Le service worker (`sw.js`) met tout en cache : plus besoin de réseau ensuite.

## Ce que contient l'app

**Entraînement** — séries chronométrées. Une erreur ou un dépassement du chrono
arrête la série. Chrono réglable (15 / 25 / 40 s ou illimité).

| Mode | Contenu |
|---|---|
| Mix complet | tous les types en aléatoire |
| Pourcentages | `53 % × 743`, fractions, parts |
| Multiplications | 2 × 2 puis 2 × 3 chiffres |
| Divisions & ratios | divisions, conversion d'un ratio en % |
| Réflexes conseil | variations, valeur initiale, règle de 72, croissance composée, market sizing |

Trois difficultés, et une option « habillage business » qui reformule les
calculs en énoncés de mission (marge, part de marché, churn…).

**Correction** — à chaque erreur, la décomposition complète du calcul tel qu'il
fallait le mener de tête, étape par étape, avec un lien vers la leçon associée.

**Leçons** — 14 fiches : ancres du pourcentage, commutativité, dictionnaire
fractions ↔ %, distributivité, arrondi-soustraction, différence de carrés,
raccourcis (×5, ×9, ×11, ×25…), division par ancrages, ratio → %, pièges des
variations, règle de 72, ordres de grandeur, vérification d'un résultat,
méthode en entretien.

**Progression** — record de série par mode × difficulté, taux de réussite,
temps moyen par bonne réponse, historique des 30 dernières séries.

**Succès** — 17 badges à débloquer (bronze/argent/or) : séries par difficulté,
volume de calculs résolus, vitesse moyenne, plus deux succès sociaux liés au
classement de groupe (rejoindre le classement, en prendre la tête sur un mode).

**Classement du groupe** — toujours visible en bas de l'écran Progression,
juste sous les succès (voir section suivante).

## Classement partagé entre plusieurs personnes (optionnel)

Par défaut, chaque personne qui ouvre l'app a ses stats isolées dans son
navigateur. Pour comparer les scores d'un groupe, l'app se connecte à une
base [Firebase](https://firebase.google.com) partagée — gratuite pour ce
volume d'usage, sans mot de passe : chacun choisit juste un pseudo dans les
réglages. Pas de config = le classement affiche juste « pas encore configuré »,
le reste de l'app fonctionne normalement (aucune dépendance obligatoire).

**Mise en place (une fois, ~5 minutes) :**

1. Va sur [console.firebase.google.com](https://console.firebase.google.com), connecte-toi avec un compte Google.
2. « Ajouter un projet » → nomme-le (ex. `calcul-mental`) → tu peux désactiver Google Analytics → Créer.
3. Menu de gauche → **Build → Firestore Database** → « Créer une base de données ».
   - Choisis une région proche (ex. `eur3 (europe-west)`).
   - Démarre en **mode production**.
4. Onglet **Règles** de Firestore → remplace tout par ceci → **Publier** :
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /runs/{runId} {
         allow read: if true;
         allow create: if request.resource.data.keys().hasOnly(['pseudo','cat','diff','streak','reason','ts'])
                       && request.resource.data.pseudo is string
                       && request.resource.data.pseudo.size() > 0 && request.resource.data.pseudo.size() <= 24
                       && request.resource.data.cat is string && request.resource.data.cat.size() <= 20
                       && request.resource.data.diff is int && request.resource.data.diff >= 0 && request.resource.data.diff <= 2
                       && request.resource.data.streak is int && request.resource.data.streak >= 0 && request.resource.data.streak <= 999
                       && request.resource.data.reason in ['wrong','timeout']
                       && request.resource.data.ts == request.time;
         allow update, delete: if false;
       }
     }
   }
   ```
   Ces règles rendent chaque partie **infalsifiable et non supprimable** : tout
   le monde peut lire le classement et ajouter sa propre partie, personne ne
   peut modifier ou effacer les scores des autres (ni même les siens).
5. Retour à la page d'accueil du projet (icône maison) → icône **`</>`** (ajouter une app Web).
   - Nomme-la, ne coche pas Firebase Hosting → Enregistrer l'application.
   - Copie l'objet `firebaseConfig` qui s'affiche.
6. Colle cet objet dans `Calcul Mental (standalone).html`, au tout début du bloc
   `CLASSEMENT PARTAGÉ (Firebase)` juste avant le script principal — remplace
   les 6 valeurs `"REMPLACE_MOI"` par les tiennes. Republie le fichier là où
   l'app est hébergée.

La clé `apiKey` n'est pas secrète : elle est destinée à être visible côté client,
la sécurité vient des règles Firestore collées à l'étape 4.

**Fonctionnement hors-ligne :** une partie se joue et s'enregistre toujours en
local sans réseau (comme avant). Le résultat est mis en file d'attente et
envoyé vers Firebase dès qu'une connexion est détectée — utile puisque le
métro coupe le réseau en cours de trajet.

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

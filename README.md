# Calcul mental — Consulting

Application d'entraînement au calcul mental orientée conseil en stratégie.
Aucune dépendance, aucun build : un seul fichier HTML autonome.

## Utilisation

Double-clique sur `index.html`. C'est tout — l'app fonctionne hors-ligne et
enregistre records et statistiques dans le navigateur (`localStorage`).

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
index.html             app complète (UI + moteur de calcul + leçons)
manifest.webmanifest   métadonnées PWA
sw.js                  cache hors-ligne
icon.svg               icône
```

Pour ajouter un type de calcul : une entrée dans `GENS` (elle retourne l'énoncé,
la réponse, la tolérance et les étapes de décomposition), puis référence son nom
dans le tableau `g` du mode voulu dans `CATS`.

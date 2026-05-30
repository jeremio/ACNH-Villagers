# data/

Fichiers source non servis par l'application (hors `public/`, donc non deployes).

- `villagers-init.json` : jeu de donnees brut complet (toutes les locales et
  champs d'origine, 391 villageois). Il sert de source pour generer la version
  allegee `public/villagers.json` (uniquement les champs utilises : noms EUen/EUfr,
  genre, hobby, personnalite, espece, anniversaire), seule consommee au runtime.

// Partie Architecture ; 
auto-site/
│
├── frontend/             # React app (UI + filtre)
│   ├── public/
│   ├── src/
│   │   ├── assets/       # images, icônes
│   │   ├── components/   # tous les composants réutilisables
│   │   ├── pages/        # HomePage, CarDetailPage, etc.
│   │   ├── redux/        # slice, store si Redux est utilisé
│   │   ├── services/     # appel à l’API (axios etc.)
│   │   ├── utils/        # fonctions utilitaires
│   │   └── App.tsx / App.jsx
│   └── package.json
│
├── backend/              # API REST pour exposer les données
│   ├── controllers/      # logique métier
│   ├── routes/           # routes API
│   ├── models/           # modèle de voiture si MongoDB est utilisé
│   ├── scrappedData.json # si tu stockes les données localement
│   ├── server.js
│   └── package.json
│
├── scraper/              # Code scraping (cheerio, puppeteer...)
│   ├── scripts/
│   │   └── scrapeCars.js
│   └── package.json
│
├── tests/                # tests unitaires, e2e, etc.
│   └── README.md
│
├── .github/              # fichiers pour GitHub Actions CI/CD
├── README.md             # documentation globale
└── .gitignore

// || . Technologies à prévoir

Partie	Stack
Frontend ;	React, Redux Toolkit, Axios, Tailwind ou CSS
Backend	 ; Node.js, Express.js
Scraping ; 	Puppeteer, Cheerio, Node-cron (pour scheduler)
Base de données (optionnelle)	; MongoDB (ou fichier JSON local au début)
CI/CD	; GitHub Actions
Tests	; Jest, React Testing Library, Cypress

// ||| Objectif UX/UI
Tu veux créer un site qui :

Affiche une liste de voitures

Permet de filtrer par nom, prix

Offre une navigation agréable et simple

Prépare une base solide pour du responsive design et une bonne expérience utilisateur

-- voir fichier UX-UI.md 

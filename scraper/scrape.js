const puppeteer = require('puppeteer');

async function scrapeCars() {
  console.log('Lancement du navigateur Puppeteer...');
  const browser = await puppeteer.launch({ headless: true });  // Lance le navigateur en mode sans tête
  console.log('Navigation lancée, ouverture d\'une nouvelle page...');
  const page = await browser.newPage();  // Crée une nouvelle page dans le navigateur
  
  console.log('Chargement de la page...');
  await page.goto('https://www.tayara.tn/ads/k/VOITURE/');  // Va sur la page des voitures

  console.log('Attente de la charge des articles...');
  // Attend que les éléments "article" soient visibles sur la page avant de continuer
  await page.waitForSelector('article.mx-0');
  
  console.log('Début de l\'extraction des informations sur les voitures...');
  const cars = await page.evaluate(() => {
    // Sélectionne tous les éléments "article" contenant les informations des voitures
    const carElements = document.querySelectorAll('article.mx-0');
    console.log(`Nombre d'articles trouvés : ${carElements.length}`);
    
    const carsData = [];

    // Itère sur chaque élément "article" pour extraire les données de la voiture
    carElements.forEach(car => {
      const name = car.querySelector('.card-title')?.innerText; // Récupère le nom de la voiture
      const image = car.querySelector('img')?.src; // Récupère l'URL de l'image
      const url = car.querySelector('a')?.href; // Récupère l'URL de l'annonce

      // Si les informations sont présentes, on les ajoute au tableau carsData
      if (name && image && url) {
        carsData.push({ name, image, url });
      } else {
        console.log('Données manquantes pour un élément.');
      }
    });

    console.log('Extraction terminée. Données collectées:', carsData);
    return carsData;  // Retourne les données collectées
  });

  console.log('Données scrappées :', cars);  // Affiche les données extraites dans la console

  console.log('Fermeture du navigateur...');
  await browser.close();  // Ferme le navigateur

  console.log('Scraping terminé.');
}

// Exécution de la fonction
scrapeCars();

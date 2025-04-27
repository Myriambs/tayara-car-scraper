// backend/server.js
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = 5000; // Port pour ton API

app.use(cors()); // Permet les requêtes Cross-Origin (utile si ton front React est sur un autre port)

async function scrapeCars() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.tayara.tn/ads/k/VOITURE/');
  await page.waitForSelector('article.mx-0');

  const cars = await page.evaluate(() => {
    const carElements = document.querySelectorAll('article.mx-0');
    const carsData = [];
    carElements.forEach(car => {
      const name = car.querySelector('.card-title')?.innerText;
      const image = car.querySelector('img')?.src;
      const url = car.querySelector('a')?.href;
      // Extraction du prix depuis les balises <span> dans la balise <data>
      let price = 'Pas de prix ici'; // valeur par défaut
    const priceDataElement = car.querySelector('data');
    if (priceDataElement) {
      const priceValue = priceDataElement.getAttribute('value');
      if (priceValue) {
        price = priceValue ; // Ajoute DT
      }
    }
  // Condition pour vérifier si le prix est présent
 
    if (name && image && url) {
      carsData.push({ name, image, url, price });
    }

    });

    return carsData;
  });

  await browser.close();
  return cars;
}

// Route pour obtenir les voitures
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await scrapeCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du scraping' });
  }
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});

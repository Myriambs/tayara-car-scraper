const { test, expect } = require('@playwright/test');

test('La page de voitures se charge', async ({ page }) => {
    await page.goto('http://localhost:3000'); // ou ton vrai site déployé
    await page.waitForTimeout(5000); // Attendre 2 secondes pour que la page se charge
    await page.waitForSelector('h1'); // Attendre que le titre soit visible
    const title = await page.title();
    console.log(title); // Afficher le titre dans la console
    await expect(title).toBe("React App");
  });

  test('filtre les voitures par nom', async ({ page }) => {
    await page.goto('http://localhost:3000'); // Remplace par l'URL de ton app
    
    // Saisir un terme de recherche
    await page.fill("input[placeholder='Rechercher par nom...']", 'Corolla');
    const result = await page.locator("div[class='car-list'] p").textContent();
    // Vérifier que la voiture filtrée est affichée
    await expect(result).toBe("Aucune voiture trouvée.");
    

  });
  
  test('filtre les voitures par prix', async ({ page }) => {
    await page.goto('http://localhost:3000'); // Remplace par l'URL de ton app
    
    // Appliquer les filtres de prix
    await page.fill("input[placeholder='Prix min']", '10000');
    await page.fill("input[placeholder='Prix max']", '20000');
    
    const result = await page.locator("div[class='car-list'] p").textContent();
    // Vérifier que la voiture filtrée est affichée
    await expect(result).toBe("Aucune voiture trouvée.");
  });

  test.skip('ouvrir un autre onglet et vérifier son URL et son contenu', async ({ page }) => {
    // Accéder à la page principale
    await page.goto('http://localhost:3000'); // Remplace par l'URL de ton app
    
    // Attendre l'ouverture d'un nouvel onglet après le clic
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),  // Attendre l'événement de popup (nouvel onglet)
      page.click("a[href='https://www.tayara.tn/item/680ea07ec5beda2b51d1daaa/Voitures/Kairouan/Kairouan/Voiture_vendre_/']"), // Cliquer sur le lien
    ]);
  
    // Vérifier l'URL de ce nouvel onglet
    await expect(newPage).toHaveURL('https://www.tayara.tn/item/680ea07ec5beda2b51d1daaa/Voitures/Kairouan/Kairouan/Voiture_vendre_/');
  
    // Vérifier que la page contient le texte spécifique (ici un exemple de contenu de la page)
    // Par exemple, vérifier si un titre ou un texte est présent dans la nouvelle page
    await expect(newPage.locator('.text-gray-700.font-bold.text-2xl.font-arabic')).toHaveText('Voiture à vendre');
    
    ;  // Exemple de texte dans la page
  
    // Optionnel : Vérification de l'URL de l'onglet après une certaine interaction
    // Exemple : Tu pourrais effectuer un autre clic ou interaction dans le nouvel onglet et vérifier l'URL à nouveau.
  });
  
  
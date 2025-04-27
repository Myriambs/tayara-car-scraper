const { test, expect } = require('@playwright/test');

test('La page de voitures se charge', async ({ page }) => {
    await page.goto('http://localhost:3000'); // ou ton vrai site déployé
    await page.waitForTimeout(5000); // Attendre 2 secondes pour que la page se charge
    await page.waitForSelector('h1'); // Attendre que le titre soit visible
    const title = await page.title();
    console.log(title); // Afficher le titre dans la console
    await expect(title).toBe("React App");
  });
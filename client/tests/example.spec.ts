import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('d inscription', async ({ page }) => {
  // Code de test ici

  const browser = page.context().browser();

  // Accéder à la page d'inscription de votre application
  await page.goto('http://localhost:3000/user'); // Mettez l'URL correcte de votre application ici

  // Cliquer sur le bouton "Pas de compte ? S'inscrire"
  await page.click('p:text("Pas de compte ? S\'inscrire")');

  // Attendre que le texte "Inscription" soit présent
  await page.waitForSelector('h2:text("Inscription")');

  // Remplir le formulaire d'inscription avec un mauvais email
  await page.getByPlaceholder('Entrez votre nom').click();
  await page.getByPlaceholder('Entrez votre nom').fill('testsignup');
  await page.getByPlaceholder('Entrez votre email').click();
  await page.getByPlaceholder('Entrez votre email').fill('testsignups@hotmail.fr');
  await page.getByPlaceholder('Confirmez votre email').click();
  await page.getByPlaceholder('Confirmez votre email').fill('testsignupshotmail.fr');
  await page.getByPlaceholder('Entrez votre mot de passe').click();
  await page.getByPlaceholder('Entrez votre mot de passe').fill('Azer1234');
  await page.getByPlaceholder('Confirmez votre mot de passe').click();
  await page.getByPlaceholder('Confirmez votre mot de passe').fill('Azer1234');

  // Cliquer sur le bouton "S'inscrire"
  await page.click('button[type="button"]');

  // Remplir le formulaire avec le bon email

  await page.getByPlaceholder('Confirmez votre email').click();
  await page.getByPlaceholder('Confirmez votre email').fill('testsignup@hotmail.fr');

  await page.click('button[type="button"]');

  await page.waitForTimeout(2000);
  await page.waitForSelector('title:text("City Guide');
});

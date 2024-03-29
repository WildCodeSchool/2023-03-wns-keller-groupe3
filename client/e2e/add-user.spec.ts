import { test } from '@playwright/test';

test("create account", async ({ page }) => {
  const randomNum = Math.floor(Math.random() * 1000000);
  const email = `test${randomNum}@test.fr`;

  await page.goto("http://localhost:3000/user");
  await page.getByText('Pas de compte ? S\'inscrire').click();
  await page.getByPlaceholder('Entrez votre nom').click();
  await page.getByPlaceholder('Entrez votre nom').fill('test');
  await page.getByPlaceholder('Entrez votre email').click();
  await page.getByPlaceholder('Entrez votre email').fill(email);
  await page.getByPlaceholder('Confirmez votre email').click();
  await page.getByPlaceholder('Confirmez votre email').fill(email);
  await page.getByPlaceholder('Entrez votre mot de passe').click();
  await page.getByPlaceholder('Entrez votre mot de passe').fill('Azer1234');
  await page.getByPlaceholder('Confirmez votre mot de passe').click();
  await page.getByPlaceholder('Confirmez votre mot de passe').fill('Azer1234');
  await page.getByRole('button', { name: 'S\'inscrire' }).click();
  await page.getByText('Déjà un compte ? Se connecter').click();
  await page.getByPlaceholder('Entrez votre email').click();
  await page.getByPlaceholder('Entrez votre email').fill(email);
  await page.getByPlaceholder('Entrez votre mot de passe').click();
  await page.getByPlaceholder('Entrez votre mot de passe').fill('Azer1234');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.getByRole('button', { name: 'Explorez maintenant !' }).click();
});

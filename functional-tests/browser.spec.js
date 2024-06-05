import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../pageobjects/pageobject';
const fs = require('fs').promises;

test('User is successfully able to purchase Tshirt', async ({ page }) => {
  const data = await fs.readFile('./data/purchase.json', 'utf8');
  const pom = new PlaywrightDevPage(page);
  await pom.login();
  await pom.addTshirt();
  await pom.validateCart(JSON.parse(data).TshirtPrice);
  await pom.checkOut();
  await pom.validateCompletion();
});

test('User is successfully able to purchase FleeceJacket', async ({ page }) => {
    const pom = new PlaywrightDevPage(page);
    const data = await fs.readFile('./data/purchase.json', 'utf8');
    await pom.login();
    await pom.addFleeceJacket();
    await pom.validateCart(JSON.parse(data).FleeceJacketPrice);
    await pom.checkOut();
    await pom.validateCompletion();
  });
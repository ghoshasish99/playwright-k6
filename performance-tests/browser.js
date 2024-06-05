import http from 'k6/http';
import { check, sleep } from 'k6';
import { browser } from 'k6/experimental/browser';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

export const options = {
  thresholds: {
    browser_http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    browser_http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
  
   scenarios: {
  //   // The scenario name appears in the result summary, tags, and so on.
  //   // You can give the scenario any name, as long as each name in the script is unique.
     ui: {
  //     // Executor is a mandatory parameter for browser-based tests.
  //     // Shared iterations in this case tells k6 to reuse VUs to execute iterations.
  //     //
  //     // See https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ for other executor types.
       
       vus: 1,
       duration: '10s',
       executor: 'constant-vus',
       options: {
         browser: {
           type: 'chromium',
         },
      },
     },
   }
}


export default async function() {
  const page = browser.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').type('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').type('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  sleep(3);
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  //await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$15.99');
  //await expect(page.locator('[data-test="item-1-title-link"]')).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  sleep(3);
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').type('Ashish');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').type('Ghosh');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').type('1181AC');
  await page.locator('[data-test="continue"]').click();
  sleep(3);
  //await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$15.99');
  await page.locator('[data-test="finish"]').click();
  //await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
}


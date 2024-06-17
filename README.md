# Nordic Testing Days Workshop

[![Playwright Tests](https://github.com/ghoshasish99/ntd-workshop/actions/workflows/functional.yaml/badge.svg)](https://github.com/ghoshasish99/ntd-workshop/actions/workflows/functional.yaml)

## Playwright Commands

⚓ Installation : `npm init playwright@latest`

<br>

🚀 Run Tests : `npx playwright test` 

<br>

🧐 Run Tests headed : `npx playwright test --headed`

or configure your `playwright.config.js` to have the following :

```json
projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless:false },
    }

```
<br>

📊 Show Report : `npx playwright show-report`   -->  this will open up the reports automatically on failure 

<br>

⛓️ Parallel/Sequential execution : `npx playwright test --workers=1` --> change the value of `workers` as per the number of parrallel threads you want

<br>

🟨 You can mark tests as `test.only` to be able to run only those tests using `npx playwright test`

```javascript

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright1/);
});

test.only('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

```

<br>

🏷️ Tagging :

You can tag tests by adding your relevant `tags` in the title.

```javascript

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright1/);
});

test.only('get started link @smoke', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

```

To be able to run only the tagged tests, you can use `npx playwright test --grep @smoke`

<br>

1️⃣ Running in a single browser : `npx playwright test --project=chromium`

<br>

🔍 To collect evidences in the form of `traces` , `screenshots` or `videos`, you can configure the `playwright.config.js` like so :

```json
use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'on',
  }

```

<br>

🖥️ Run in UI mode : `npx playwright test --ui`

<br>

⏺️ To open Playwright Recorder : `npx playwright codegen`

### To read more about Playwright, check [this.](https://playwright.dev/)

---------------------------------------------

## k6 Commands

⚓ Installation :
 
 * For Mac - `brew install k6`
 * For Windows - `winget install k6`              

<br>

✨ Create a new Test File : `k6 new mytest.js` 

<br>

🚀 Run tests : `k6 run mytest.js` 

<br>

💪 Parameterized run : `k6 run --vus 10 --duration 30s mytest.js`

<br>

📶 Ramp up/down set up :

```javascript
export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};
```

✅ How to use `Check`s :

```javascript

const res = http.get('https://httpbin.test.k6.io/');
check(res, { 'status was 200': (r) => r.status == 200 });

```

🔳 How to use `Group`s :

```javascript

 group('Create User', function(){
    let data = {
      "name": "Ashish",
      "job": "Testing",
    }
    const newUser = http.post('https://reqres.in/api/users',JSON.stringify(data));
    check(newUser,{'Create Successful':(r)=>r.status==201})
    console.log("Created User ID "+newUser.json().id)
    sleep(3)
  });

```

📊 How to use HTML Report :

```javascript
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";


export function handleSummary(data) {
  return {
      'TestSummaryReport.html': htmlReport(data, { debug: true })
  };
}

```

🌐 How to perform Browser Tests :

```javascript
import { browser } from 'k6/experimental/browser';

executor: 'constant-vus',

const page = browser.newPage();
```

To run these tests : `K6_BROWSER_HEADLESS=false k6 run browser.js`

### To read more about k6, check [this.](https://k6.io/)

--------------------------

## About the author

🖇️ Check out my profile : https://ashishghosh.carrd.co/

🤝 Connect with me on : [![Linkedin](https://i.sstatic.net/gVE0j.png) LinkedIn](https://www.linkedin.com/in/ashish-ghosh/)

🛠️ View my work on [![GitHub](https://i.sstatic.net/tskMh.png) GitHub](https://github.com/ghoshasish99)
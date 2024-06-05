import { test, expect } from '@playwright/test';


test('should get userlist', async ({ request }) => {
  const userList = await request.get('/api/users?page=2');
  expect(userList.status()).toBe(200);
  expect(await userList.text()).toContain('lindsay');
});

test('should create a new user', async ({ request }) => {
   const newUser = await request.post('/api/users', {
    data: {
      "name": "Ashish",
      "job": "Testing",
    }
  });
  expect(newUser.status()).toBe(201);
  expect(await newUser.text()).toContain('Ashish');
  expect(await newUser.json()).toHaveProperty("name", "Ashish");
});

test('should update an existing user', async ({ request }) => {
    const updatedUser = await request.put('/api/users/2', {
     data: {
       "name": "Ashish",
       "job": "Testing",
     }
   });
   expect(updatedUser.status()).toBe(200);
   expect(await updatedUser.text()).toContain('Ashish');
   expect(await updatedUser.json()).toHaveProperty("name", "Ashish");
 });

 test('should delete an existing user', async ({ request }) => {
   const deletedUser = await request.delete('/api/users/2');
   expect(deletedUser.status()).toBe(204);
   
 });
 
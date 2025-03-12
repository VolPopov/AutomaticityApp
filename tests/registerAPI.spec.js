import { test, expect } from '@playwright/test';
import { RegisterAPI } from '../modules/registerAPI.js';
import { generateUserCredentials } from '../fixtures/credentials.js';
import { SUCCESS_MESSAGES } from '../fixtures/messages.js';

test.describe("Register API tests", () => {
    let registerAPI;
    const { username, email, password } = generateUserCredentials(5);

  test.beforeEach("Visit the login page", ({ page }) => {
        registerAPI = new RegisterAPI(page);
    });

  test('Succesful register of new user', async ({}) => {
       const response = await registerAPI.register(
          username, email, password
        );
        expect(response.status).toBe(SUCCESS_MESSAGES["BASIC_SUCCESS_MESSAGE"]);
        expect(response.message).toBe(SUCCESS_MESSAGES["USER_CREATED_SUCCESSFULLY"]);
        expect(response.user.username).toBe(username);
        expect(response.user.email).toBe(email);        
    });
});
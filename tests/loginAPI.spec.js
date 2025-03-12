import { test, expect } from '@playwright/test';
import { VALID_USER_CREDENTIALS } from '../fixtures/credentials.js';
import { LoginAPI } from '../modules/loginAPI.js';
import { SUCCESS_MESSAGES } from '../fixtures/messages.js';

test.describe("Login API tests", () => {
    let loginAPI;

  test.beforeEach("Visit the login page", ({ page }) => {
        loginAPI = new LoginAPI(page);
    });

  test('Succesful login with valid credentials', async ({}) => {
       const response = await loginAPI.login(
          VALID_USER_CREDENTIALS["VALID_EMAIL"], VALID_USER_CREDENTIALS["VALID_PASSWORD"],
        );
        expect(response.status).toBe(SUCCESS_MESSAGES["BASIC_SUCCESS_MESSAGE"]);
        expect(response.message).toBe(SUCCESS_MESSAGES["USER_LOGGED_IN"]);
        expect(response.user.email).toBe(VALID_USER_CREDENTIALS["VALID_EMAIL"]);
      });
});
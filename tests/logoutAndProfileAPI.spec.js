import { test, expect } from '@playwright/test';
import { LoginAPI } from '../modules/loginAPI.js';
import { SUCCESS_MESSAGES } from '../fixtures/messages.js';
import { VALID_USER_CREDENTIALS } from '../fixtures/credentials.js';

test.describe("Logout and profile checking tests", () => {

    let loginAPI;
    let bearerToken;

    test.beforeEach("Log in with correfct credentials", async ({ page }) => {
        loginAPI = new LoginAPI(page);
        const response = await loginAPI.login({});
        bearerToken = await response.auth.token;
    });

    test("Successful logout", async ({}) => {
        await loginAPI.logout({token: bearerToken});
    });

    test("Succesful profile get", async ({}) => {
        await loginAPI.profile({token: bearerToken, username: VALID_USER_CREDENTIALS["VALID_USERNAME"], email: VALID_USER_CREDENTIALS["VALID_EMAIL"]});
    });
});
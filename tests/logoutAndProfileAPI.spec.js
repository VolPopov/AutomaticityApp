import { test } from '../fixtures/basePage.js';
import { VALID_USER_CREDENTIALS } from '../fixtures/credentials.js';

test.describe("Logout and profile checking tests", () => {

    let bearerToken;

    test.beforeEach("Log in with correfct credentials", async ({ authAPI }) => {
        const response = await authAPI.login({});
        bearerToken = await response.auth.token;
    });

    test("Successful logout", { tag: "@smoke" }, async ({ authAPI }) => {
        await authAPI.logout({ token: bearerToken });
    });

    test("Succesful profile get", { tag: "@smoke" }, async ({ authAPI }) => {
        await authAPI.profile({ token: bearerToken, username: VALID_USER_CREDENTIALS["VALID_USERNAME"], email: VALID_USER_CREDENTIALS["VALID_EMAIL"] });
    });

    test("Succesful refresh of token", { tag: "@smoke" }, async ({ authAPI }) => {
        await authAPI.refresh({ token: bearerToken })
    });
});
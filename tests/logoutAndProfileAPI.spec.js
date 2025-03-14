import { test } from '../fixtures/basePage.js';
import { INVALID_USER_CREDENTIALS, VALID_USER_CREDENTIALS } from '../fixtures/credentials.js';
import { ERROR_MESSAGES } from '../fixtures/messages.js';

test.describe("Logout and profile checking tests", () => {

    let bearerToken;

    test.beforeEach("Log in with correfct credentials", async ({ authAPI }) => {
        const response = await authAPI.login({});
        bearerToken = await response.auth.token;
    });

    test("Attempt to log out with invalid token", { tag: "@regression" }, async ({ authAPI }) => {
        await authAPI.logout({ token: INVALID_USER_CREDENTIALS["INVALID_TOKEN"], statusCode: 500, message: ERROR_MESSAGES["INVALID_TOKEN"] });
    });

    test("attempt to log out with expired token", { tag: "@regression" }, async ({ authAPI }) => {
        await authAPI.logout({ token: INVALID_USER_CREDENTIALS["EXPIRED_TOKEN"], statusCode: 500, message: ERROR_MESSAGES["EXPIRED_TOKEN"]})
    })

    test("Attempt to get profile of user with invalid token", { tag: "@regression" }, async ({ authAPI }) => {
        await authAPI.profile({ token: INVALID_USER_CREDENTIALS["INVALID_TOKEN"], statusCode: 500 })
    });

    test("Attempt to refresh an invalid token", { tag: "@regression" }, async ({ authAPI }) => {
        await authAPI.refresh({ token: INVALID_USER_CREDENTIALS["INVALID_TOKEN"], statusCode: 500, message: ERROR_MESSAGES["INVALID_TOKEN"] });
    });

    test("Attempt to fetch profile of recently deleted user", { tag: "@regression" }, async ({ authAPI }) => {
        const response2 = await authAPI.register({});
        let userID = response2.user.id;
        let username = response2.user.username;
        let email = response2.user.email;
        let bearerToken2 = response2.auth.token;
        await authAPI.delete({ userID: userID, token: bearerToken2 });
        await authAPI.profile({ token: bearerToken2, username: username, email: email, statusCode: 422 });
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
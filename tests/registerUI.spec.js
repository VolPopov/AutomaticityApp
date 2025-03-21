import { test } from "../fixtures/basePage.js";
import { URLS } from "../fixtures/urls.js";
import { ERROR_MESSAGES } from "../fixtures/messages.js";

test.describe('Register tests', () => {

  test.beforeEach('Visit the login page', async ({ page }) => {
    await page.goto(URLS["REGISTER_PAGE"]);
  });

  test("Attempt to register user with no credentials at all", { tag: "@regression" }, async ({ authUI }) => {
    await authUI.register({ username: "", email: "", password: "", statusCode: 422, message: ERROR_MESSAGES["USERNAME_EMAIL_AND_PASSWORD_ALL_MISSING"] });
  });

  test("Attempt to register user with no username", { tag: "@regression" }, async({ authUI }) => {
    await authUI.register({ username: "", statusCode: 422, message: ERROR_MESSAGES["USERNAME_MISSING"] });
  });

  test("Attempt to register with no email", { tag: "@regression" }, async ({ authUI }) => {
    await authUI.register({ email: "", statusCode: 422, message: ERROR_MESSAGES["EMAIL_MISSING"] });
  });

  test("Attempt to register with no password", { tag: "@regression" }, async ({ authUI }) => {
    await authUI.register({ password: "", statusCode: 422, message: ERROR_MESSAGES["PASSWORD_MISSING"] });
  });

  test("Register", { tag: "@smoke" }, async ({ authUI }) => {
    await authUI.register({});
  });
});
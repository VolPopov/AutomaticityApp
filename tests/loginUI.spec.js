import { test } from "../fixtures/basePage.js";
import { URLS } from "../fixtures/urls.js";

test.describe('Login tests', () => {

  test.beforeEach('Visit the login page', async ({ page }) => {
    await page.goto(URLS["LOGIN_PAGE"]);
  });

  test("Log in", { tag: "@smoke" }, async ({ authUI }) => {
    await authUI.login({});
  });
});
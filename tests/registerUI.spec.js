import { test } from "../fixtures/basePage.js";
import { URLS } from "../fixtures/urls.js";

test.describe('Register tests', () => {

  test.beforeEach('Visit the login page', async ({ page }) => {
    await page.goto(URLS["REGISTER_PAGE"]);
  });

  test("Register", { tag: "@smoke" }, async ({ authUI }) => {
    await authUI.register({});
  });
});
import { expect } from "@playwright/test";
import { VALID_USER_CREDENTIALS } from "../fixtures/credentials.js";
import { URLS } from "../fixtures/urls.js";
import { generateUserCredentials } from "../generalFunctions/functions.js";

const { username1, email1, password1 } = generateUserCredentials(5);

export class AuthUI {
    constructor(page) {
        this.page = page;
        this.username = page.locator('#username');
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.submitButton = page.locator('button');
      }
    
      async login({
        email = VALID_USER_CREDENTIALS["VALID_EMAIL"], 
        password = VALID_USER_CREDENTIALS["VALID_PASSWORD"]
      }) {
        expect(this.email).toBeEditable();
        await this.email.fill(email);
        expect(this.password).toBeEditable();
        await this.password.fill(password);
        expect(this.submitButton).toBeEnabled();
        const responsePromise = this.page.waitForResponse("/api/v1/auth/login");
        await this.submitButton.click();
        const response = await responsePromise;
        expect(response.status()).toBe(200);
        await expect(this.page).toHaveURL(URLS["DASHBOARD"]);
      }

      async register({
        username = username1, 
        email = email1, 
        password = password1
      }) {
        expect(this.username).toBeEditable();
        await this.username.fill(username);
        expect(this.email).toBeEditable();
        await this.email.fill(email);
        expect(this.password).toBeEditable();
        await this.password.fill(password);
        expect(this.submitButton).toBeEnabled();
        const responsePromise = this.page.waitForResponse("/api/v1/auth/register");
        await this.submitButton.click();
        const response = await responsePromise;
        expect(response.status()).toBe(200);
        await expect(this.page).toHaveURL(URLS["DASHBOARD"]);
      }
}
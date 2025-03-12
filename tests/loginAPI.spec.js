import { test, expect } from '@playwright/test';
import { INVALID_USER_CREDENTIALS, VALID_USER_CREDENTIALS } from '../fixtures/credentials.js';
import { LoginAPI } from '../modules/loginAPI.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../fixtures/messages.js';

test.describe("Login API tests", () => {
    let loginAPI;

    test.beforeEach("Visit the login page", ({ page }) => {
      loginAPI = new LoginAPI(page);
  });
  
  test("Attempt to log in with no credentials of any kind", async ({}) => {
    const response = await loginAPI.login({email: "", password: ""});
    expect(response.message).toBe(ERROR_MESSAGES["EMAIL_AND_PASSWORD_BOTH_MISSING"]);
    expect(response.errors.email).toContain(ERROR_MESSAGES["EMAIL_MISSING"]);
    expect(response.errors.password).toContain(ERROR_MESSAGES["PASSWORD_MISSING"]);
  });

  test("Attempt to log in with no password", async ({}) => {
    const response = await loginAPI.login({password: ""});
    expect(response.message).toBe(ERROR_MESSAGES["PASSWORD_MISSING"]);
    expect(response.errors.password).toContain(ERROR_MESSAGES["PASSWORD_MISSING"]);
  });

  test("Attempt to log in with a correct mail, but the wrong password", async ({}) => {
    const response = await loginAPI.login({password:INVALID_USER_CREDENTIALS["INCORRECT_PASSWORD_FOR_VALID_USER"]});
    expect(response.error).toBe(ERROR_MESSAGES["UNAUTHORIZED"]);
  });

  test("Attempt to log in with invalid mail format", async ({}) => {
    const response = await loginAPI.login({email: INVALID_USER_CREDENTIALS["INVALID_MAIL_FORMAT"]});
    expect(response.message).toBe(ERROR_MESSAGES["INVALID_MAIL_FORMAT_FOR_LOGIN"]);
    expect(response.errors.email).toContain(ERROR_MESSAGES["INVALID_MAIL_FORMAT_FOR_LOGIN"]);
  });

  test("Attempt to log in with valid email address that has not been registered", async ({}) => {
    const response = await loginAPI.login({email: INVALID_USER_CREDENTIALS["VALID_MAIL_BUT_NOT_REGISTERED"]});
    expect(response.error).toBe(ERROR_MESSAGES["UNAUTHORIZED"]);
  });


  test('Succesful login with valid credentials', async ({}) => {
       const response = await loginAPI.login({});
        expect(response.status).toBe(SUCCESS_MESSAGES["BASIC_SUCCESS_MESSAGE"]);
        expect(response.message).toBe(SUCCESS_MESSAGES["USER_LOGGED_IN"]);
        expect(response.user.email).toBe(VALID_USER_CREDENTIALS["VALID_EMAIL"]);
      });
});
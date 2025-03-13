import { test } from '@playwright/test';
import { INVALID_USER_CREDENTIALS } from '../fixtures/credentials.js';
import { AuthAPI } from '../modules/authAPI.js';
import { ERROR_MESSAGES } from '../fixtures/messages.js';

test.describe("Login API tests", () => {
    let loginAPI;
    
    test.beforeEach("Visit the login page", ({ page }) => {
      loginAPI = new AuthAPI(page);
  });
  
  test("Attempt to log in with no credentials of any kind", async ({}) => {
    await loginAPI.login({ email: "", password: "", statusCode: 422, message: ERROR_MESSAGES["EMAIL_AND_PASSWORD_BOTH_MISSING"] });
  });

  test("Attempt to log in with no password", async ({}) => {
    await loginAPI.login({ password: "", statusCode: 422, message: ERROR_MESSAGES["PASSWORD_MISSING"] });
  });

  test("Attempt to log in with a correct mail, but the wrong password", async ({}) => {
    await loginAPI.login({ password:INVALID_USER_CREDENTIALS["INCORRECT_PASSWORD_FOR_VALID_USER"], statusCode: 401, error: ERROR_MESSAGES["UNAUTHORIZED"] });
  });

  test("Attempt to log in with invalid mail format", async ({}) => {
    await loginAPI.login({ email: INVALID_USER_CREDENTIALS["INVALID_MAIL_FORMAT"], statusCode: 422, message: ERROR_MESSAGES["INVALID_MAIL_FORMAT_FOR_LOGIN"] });
  });

  test("Attempt to log in with valid email address that has not been registered", async ({}) => {
    await loginAPI.login({ email: INVALID_USER_CREDENTIALS["VALID_MAIL_BUT_NOT_REGISTERED"], statusCode: 401, error: ERROR_MESSAGES["UNAUTHORIZED"] });
  });

  test('Succesful login with valid credentials', async ({}) => {
       await loginAPI.login({});
      });
});
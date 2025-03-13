import { test } from '@playwright/test';
import { AuthAPI } from '../modules/authAPI.js';
import { INVALID_USER_CREDENTIALS, VALID_USER_CREDENTIALS } from '../fixtures/credentials.js';
import { ERROR_MESSAGES } from '../fixtures/messages.js';

test.describe("Register API tests", () => {
    let registerAPI;

  test.beforeEach("Visit the login page", ({ page }) => {
        registerAPI = new AuthAPI(page);
    });

  test("Attempt to register user with no credentials at all", async ({}) => {
    await registerAPI.register({ username: "", email: "", password: "", statusCode: 422, message: ERROR_MESSAGES["USERNAME_EMAIL_AND_PASSWORD_ALL_MISSING"] });
  });

  test("Attempt to register user with no username", async({}) => {
    await registerAPI.register({ username: "", statusCode: 422, message: ERROR_MESSAGES["USERNAME_MISSING"] });
  });

  test("Attempt to register with no email", async ({}) => {
    await registerAPI.register({ email: "", statusCode: 422, message: ERROR_MESSAGES["EMAIL_MISSING"] });
  });

  test("Attempt to register with no password", async ({}) => {
    await registerAPI.register({ password: "", statusCode: 422, message: ERROR_MESSAGES["PASSWORD_MISSING"] });
  });

  test("Attempt to register user with a password shorter than 6 characters", async ({}) => {
    await registerAPI.register({ password: INVALID_USER_CREDENTIALS["SHORT_PASSWORD"], statusCode: 422, message: ERROR_MESSAGES["PASSWORD_TOO_SHORT"] });
  });

  test("Attempt to register user with an invalid mail", async ({}) => {
    await registerAPI.register({ email: INVALID_USER_CREDENTIALS["INVALID_MAIL_FORMAT"], statusCode: 422, message: ERROR_MESSAGES["INVALID_MAIL_FORMAT_FOR_REGISTER"] });
  });

  test("Attempt to register an aleady registered user", async ({}) => {
    await registerAPI.register({ username: VALID_USER_CREDENTIALS["VALID_USERNAME"], email: VALID_USER_CREDENTIALS["VALID_EMAIL"], password: VALID_USER_CREDENTIALS["VALID_PASSWORD"], statusCode: 422, message: ERROR_MESSAGES["USER_ALREADY_EXISTS"] });
  });

  test("Attempt to register user with an already existing username", async ({}) => {
    await registerAPI.register({ username: VALID_USER_CREDENTIALS["VALID_USERNAME"], statusCode: 422, message: ERROR_MESSAGES["TAKEN_USERNAME"] });
  });

  test("Attempt to register user with an already registered mail", async ({}) => {
    await registerAPI.register({ email: VALID_USER_CREDENTIALS["VALID_EMAIL"], statusCode: 422, message: ERROR_MESSAGES["TAKEN_EMAIL"] });
  });
  
  test('Succesful register of new user', async ({}) => {
    await registerAPI.register({});
    });
});
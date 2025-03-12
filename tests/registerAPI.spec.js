import { test, expect } from '@playwright/test';
import { RegisterAPI } from '../modules/registerAPI.js';
import { generateUserCredentials, INVALID_USER_CREDENTIALS, VALID_USER_CREDENTIALS } from '../fixtures/credentials.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../fixtures/messages.js';

test.describe("Register API tests", () => {
    let registerAPI;

  test.beforeEach("Visit the login page", ({ page }) => {
        registerAPI = new RegisterAPI(page);
    });

  test("Attempt to register user with no credentials at all", async ({}) => {
    const response = await registerAPI.register({username: "", email: "", password: ""});
    expect(response.message).toBe(ERROR_MESSAGES["USERNAME_EMAIL_AND_PASSWORD_ALL_MISSING"]);
    expect(response.errors.username).toContain(ERROR_MESSAGES["USERNAME_MISSING"]);
    expect(response.errors.email).toContain(ERROR_MESSAGES["EMAIL_MISSING"]);
    expect(response.errors.password).toContain(ERROR_MESSAGES["PASSWORD_MISSING"]);
  });

  test("Attempt to register user with no username", async({}) => {
    const response = await registerAPI.register({username: ""});
    expect(response.message).toBe(ERROR_MESSAGES["USERNAME_MISSING"]);
    expect(response.errors.username).toContain(ERROR_MESSAGES["USERNAME_MISSING"]);
  });

  test("Attempt to register with no email", async ({}) => {
    const response = await registerAPI.register({email: ""});
    expect(response.message).toBe(ERROR_MESSAGES["EMAIL_MISSING"]);
    expect(response.errors.email).toContain(ERROR_MESSAGES["EMAIL_MISSING"]);
  });

  test("Attempt to register with no password", async ({}) => {
    const response = await registerAPI.register({password: ""});
    expect(response.message).toBe(ERROR_MESSAGES["PASSWORD_MISSING"]);
    expect(response.errors.password).toContain(ERROR_MESSAGES["PASSWORD_MISSING"]);
  });

  test("Attempt to register user with a password shorter than 6 characters", async ({}) => {
    const response = await registerAPI.register({password: INVALID_USER_CREDENTIALS["SHORT_PASSWORD"]});
    expect(response.message).toBe(ERROR_MESSAGES["PASSWORD_TOO_SHORT"]);
    expect(response.errors.password).toContain(ERROR_MESSAGES["PASSWORD_TOO_SHORT"]);
  });

  test("Attempt to register user with an invalid mail", async ({}) => {
    const response = await registerAPI.register({email: INVALID_USER_CREDENTIALS["INVALID_MAIL_FORMAT"]});
    expect(response.message).toBe(ERROR_MESSAGES["INVALID_MAIL_FORMAT_FOR_REGISTER"]);
    expect(response.errors.email).toContain(ERROR_MESSAGES["INVALID_MAIL_FORMAT_FOR_REGISTER"]);
  });

  test("Attempt to register an aleady registered user", async ({}) => {
    const response = await registerAPI.register({username: VALID_USER_CREDENTIALS["VALID_USERNAME"], email: VALID_USER_CREDENTIALS["VALID_EMAIL"], password: VALID_USER_CREDENTIALS["VALID_PASSWORD"]});
    expect(response.message).toBe(ERROR_MESSAGES["USER_ALREADY_EXISTS"]);
    expect(response.errors.username).toContain(ERROR_MESSAGES["TAKEN_USERNAME"]);
    expect(response.errors.email).toContain(ERROR_MESSAGES["TAKEN_EMAIL"]);
  });

  test("Attempt to register user with an already existing username", async ({}) => {
    const response = await registerAPI.register({username: VALID_USER_CREDENTIALS["VALID_USERNAME"]});
    expect(response.message).toBe(ERROR_MESSAGES["TAKEN_USERNAME"]);
    expect(response.errors.username).toContain(ERROR_MESSAGES["TAKEN_USERNAME"]);
  });

  test("Attempt to register user with an already registered mail", async ({}) => {
    const response = await registerAPI.register({email: VALID_USER_CREDENTIALS["VALID_EMAIL"]});
    expect(response.message).toBe(ERROR_MESSAGES["TAKEN_EMAIL"]);
    expect(response.errors.email).toContain(ERROR_MESSAGES["TAKEN_EMAIL"]);
  });
  
  test('Succesful register of new user', async ({}) => {
       const response = await registerAPI.register({});
        expect(response.status).toBe(SUCCESS_MESSAGES["BASIC_SUCCESS_MESSAGE"]);
        expect(response.message).toBe(SUCCESS_MESSAGES["USER_CREATED_SUCCESSFULLY"]);
    });
});
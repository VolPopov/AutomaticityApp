import { test } from '../fixtures/basePage.js';
import { INVALID_USER_CREDENTIALS, VALID_USER_CREDENTIALS } from '../fixtures/credentials.js';
import { ERROR_MESSAGES } from '../fixtures/messages.js';

test.describe("Register API tests", () => {

  test("Attempt to register user with no credentials at all", { tag: "@regression" }, async ({ authAPI }) => {
    await authAPI.register({ username: "", email: "", password: "", statusCode: 422, message: ERROR_MESSAGES["USERNAME_EMAIL_AND_PASSWORD_ALL_MISSING"] });
  });

  test("Attempt to register user with no username", { tag: "@regression" }, async({ authAPI }) => {
    await authAPI.register({ username: "", statusCode: 422, message: ERROR_MESSAGES["USERNAME_MISSING"] });
  });

  test("Attempt to register with no email", { tag: "@regression" }, async ({ authAPI }) => {
    await authAPI.register({ email: "", statusCode: 422, message: ERROR_MESSAGES["EMAIL_MISSING"] });
  });

  test("Attempt to register with no password", { tag: "@regression" }, async ({ authAPI }) => {
    await authAPI.register({ password: "", statusCode: 422, message: ERROR_MESSAGES["PASSWORD_MISSING"] });
  });

  test("Attempt to register user with a password shorter than 6 characters", { tag: "@regression" }, async ({ authAPI }) => {
    await authAPI.register({ password: INVALID_USER_CREDENTIALS["SHORT_PASSWORD"], statusCode: 422, message: ERROR_MESSAGES["PASSWORD_TOO_SHORT"] });
  });

  test("Attempt to register user with a password of 1000 characters", { tag: "@regression" }, async ({ authAPI }) => {
    await authAPI.register({ password: INVALID_USER_CREDENTIALS["LONG_PASSWORD"], statusCode: 422 });
  });

  test("Attempt to register user with an invalid mail", { tag: "@regression" }, async ({ authAPI }) => {
    await authAPI.register({ email: INVALID_USER_CREDENTIALS["INVALID_MAIL_FORMAT"], statusCode: 422, message: ERROR_MESSAGES["INVALID_MAIL_FORMAT_FOR_REGISTER"] });
  });

  test("Attempt to register an aleady registered user", { tag: "@regression" }, async ({ authAPI }) => {
    await authAPI.register({ username: VALID_USER_CREDENTIALS["VALID_USERNAME"], email: VALID_USER_CREDENTIALS["VALID_EMAIL"], password: VALID_USER_CREDENTIALS["VALID_PASSWORD"], statusCode: 422, message: ERROR_MESSAGES["USER_ALREADY_EXISTS"] });
  });

  test("Attempt to register user with an already existing username", { tag: "@regression" }, async ({ authAPI }) => {
    await authAPI.register({ username: VALID_USER_CREDENTIALS["VALID_USERNAME"], statusCode: 422, message: ERROR_MESSAGES["TAKEN_USERNAME"] });
  });

  test("Attempt to register user with an already registered mail", { tag: "@regression" }, async ({ authAPI }) => {
    await authAPI.register({ email: VALID_USER_CREDENTIALS["VALID_EMAIL"], statusCode: 422, message: ERROR_MESSAGES["TAKEN_EMAIL"] });
  });
  
  test('Succesful register of new user', { tag: "@smoke" }, async ({ authAPI }) => {
    await authAPI.register({});
    });
});
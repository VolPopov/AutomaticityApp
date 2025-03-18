import { test } from '../fixtures/basePage.js';
import { INVALID_ID, INVALID_USER_CREDENTIALS, VALID_USER_CREDENTIALS } from '../fixtures/credentials.js';
import { ERROR_MESSAGES, noID } from '../fixtures/messages.js';

test.describe("Customer API tests", () => {

    let userID;
    let bearerToken;

    test.beforeEach("Get user token and ID", async ({ authAPI }) => {
        const response = await authAPI.login({});
        userID = await response.user.id;
        bearerToken = await response.auth.token;
    });

    test("Attempt to list all customers without a token", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.getCustomers({ token: "", statusCode: 401, message: ERROR_MESSAGES["UNAUTHENTICATED"] })
    });

    test("Attempt to list all customers with an expired token", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.getCustomers({ token: INVALID_USER_CREDENTIALS["EXPIRED_TOKEN"], statusCode: 401, message: ERROR_MESSAGES["UNAUTHENTICATED"] });
    });

    test("Attempt to list all customers using unvalid methods", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.invalidGetCustomers({ method: "post", token: bearerToken });
        await customersAPI.invalidGetCustomers({ method: "put", token: bearerToken });
        await customersAPI.invalidGetCustomers({ method: "patch", token: bearerToken });
        await customersAPI.invalidGetCustomers({ method: "delete", token: bearerToken });
    });

    test("Attempt to get a single customer without a token", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.getSpecificCustomer({ token: "", statusCode: 401, message: ERROR_MESSAGES["UNAUTHENTICATED"] });
    });

    test("Attempt to get a single customer with an expired token", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.getSpecificCustomer({ token: INVALID_USER_CREDENTIALS["EXPIRED_TOKEN"], statusCode: 401, message: ERROR_MESSAGES["UNAUTHENTICATED"] });
    });

    test("Attempt to get a customer with no valid ID", { tag: "@regression" }, async({ customersAPI }) => {
        await customersAPI.getSpecificCustomer({ token: bearerToken, userID: INVALID_ID, statusCode: 404, message: noID(INVALID_ID) });
    });

    test("Attempt to update customer with no token", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateCustomer({ token: "", statusCode: 401, message: ERROR_MESSAGES["UNAUTHENTICATED"] });
    });

    test("Attempt to update a customer with no valid ID", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateCustomer({ token: bearerToken, userID: INVALID_ID, statusCode: 404, message: noID(INVALID_ID) });
    });

    test("Attempt to update customer username to empty string", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateCustomer({ token: bearerToken, username: "", statusCode: 422, message: ERROR_MESSAGES['USERNAME_IS_NULL'] });
    });

    test("Attempt to update customer username to already existing one", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateCustomer({ token: bearerToken, username: VALID_USER_CREDENTIALS["VALID_USERNAME"], statusCode: 422 });
    });

    test("Attempt to update customer email to invalid format", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateCustomer({ token: bearerToken, email: INVALID_USER_CREDENTIALS["INVALID_MAIL_FORMAT"], statusCode: 422 });
    });

    test("Attempt to update customer email to already existing email", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateCustomer({ token: bearerToken, email: VALID_USER_CREDENTIALS["VALID_EMAIL"], statusCode: 422 });
    });

    test("Attempt to update password to empty string", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateCustomer({ token: bearerToken, password: "", statusCode: 422 });
    });

    test("Attempt to delete customer without token", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.delete({ token: "", statusCode: 401, message: ERROR_MESSAGES["UNAUTHENTICATED"] });
    });

    test("Attempt to delete customer with no valid ID", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.delete({ userID: INVALID_ID, token: bearerToken, statusCode: 404, message: noID(INVALID_ID) })
    });

    test("List all customers in database", { tag: "@smoke" }, async ({ customersAPI }) => {
        await customersAPI.getCustomers({ token: bearerToken });
    });

    test("Get information of specific customer", { tag: "@smoke" }, async ({ customersAPI }) => {
        await customersAPI.getSpecificCustomer({ token: bearerToken, userID: userID })
    });

    test("Update customer information", { tag: "@smoke" }, async ({ customersAPI }) => {
        await customersAPI.updateCustomer({ token: bearerToken })
    });

    test("Delete a customer from database", { tag: "@smoke" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.register({});
        await customersAPI.delete({ userID: response.user.id, token: response.auth.token });
    });
});

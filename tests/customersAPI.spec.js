import { test } from '../fixtures/basePage.js';
import { INVALID_ID, INVALID_USER_CREDENTIALS, VALID_USER_CREDENTIALS } from '../fixtures/credentials.js';
import { ERROR_MESSAGES, noID } from '../fixtures/messages.js';

test.describe("Customer API tests", () => {

    test("Attempt to list all users without a token", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.getCustomers({ token: "", statusCode: 401, message: ERROR_MESSAGES["UNAUTHENTICATED"] })
    });

    test("Attempt to list all customers using unvalid methods", { tag: "@regression" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.invalidGetCustomers({ method: "post", token: response.auth.token });
        await customersAPI.invalidGetCustomers({ method: "put", token: response.auth.token });
        await customersAPI.invalidGetCustomers({ method: "patch", token: response.auth.token });
        await customersAPI.invalidGetCustomers({ method: "delete", token: response.auth.token });
    });

    test("Attempt to get a single customer without a token", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.getSpecificCustomer({ token: "", statusCode: 401, message: ERROR_MESSAGES["UNAUTHENTICATED"] });
    });

    test("Attempt to get customer with no valid ID", { tag: "@regression" }, async({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.getSpecificCustomer({ token: response.auth.token, userID: INVALID_ID, statusCode: 404, message: noID(INVALID_ID) });
    });

    test("Attempt to update customer username to empty string", { tag: "@regression" }, async ({ authAPI,customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateCustomer({ token: response.auth.token, username: "", statusCode: 422, message: ERROR_MESSAGES['USERNAME_IS_NULL'] });
    });

    test("Attempt to update customer email to invalid format", { tag: "@regression" }, async ({ authAPI,customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateCustomer({ token: response.auth.token, email: INVALID_USER_CREDENTIALS["INVALID_MAIL_FORMAT"], statusCode: 422 });
    });

    test("Attempt to update customer email to already existing email", { tag: "@regression" }, async ({ authAPI,customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateCustomer({ token: response.auth.token, email: VALID_USER_CREDENTIALS["VALID_EMAIL"], statusCode: 422 });
    });

    test("List all customers in database", { tag: "@smoke" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.getCustomers({ token: response.auth.token });
    });

    test("Get information of specific customer", { tag: "@smoke" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.getSpecificCustomer({ token: response.auth.token, userID: response.user.id })
    });

    test("Update customer information", { tag: "@smoke" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateCustomer({ token: response.auth.token })
    });

    test("Delete a customer from database", { tag: "@smoke" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.register({});
        await customersAPI.delete({ userID: response.user.id, token: response.auth.token });
    });
});
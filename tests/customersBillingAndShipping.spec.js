import { test } from '../fixtures/basePage.js';
import { INVALID_ID } from '../fixtures/credentials.js';
import { ERROR_MESSAGES, noID } from '../fixtures/messages.js';

test.describe("Customer API tests regarding billing and shipping info", () => {

    test("Attempt to get billing info without a token", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.getBillingInfo({ token: "", statusCode: 401, message: ERROR_MESSAGES["UNAUTHENTICATED"] });
    });

    test("Attempt to get billing info of a customer with no valid ID", { tag: "@regression" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.getBillingInfo({ token: response.auth.token, userID: INVALID_ID, statusCode: 404, message: noID(INVALID_ID) });
    });

    test("Get billing info of customer", { tag: "@smoke" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.getBillingInfo({ token: response.auth.token, userID: response.user.id });
    });

    test("Update billing info of customer", { tag: "@smoke" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateBillingInfo({ token: response.auth.token, userID: response.user.id });
    });

});

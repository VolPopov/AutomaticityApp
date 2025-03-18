import { test } from '../fixtures/basePage.js';
import { INVALID_BILLING_INFO, INVALID_ID } from '../fixtures/credentials.js';
import { ERROR_MESSAGES, noID } from '../fixtures/messages.js';

test.describe("Customer API tests regarding billing and shipping info", () => {

    test("Attempt to get billing info without a token", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.getBillingInfo({ token: "", statusCode: 401, message: ERROR_MESSAGES["UNAUTHENTICATED"] });
    });

    test("Attempt to get billing info of a customer with no valid ID", { tag: "@regression" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.getBillingInfo({ token: response.auth.token, userID: INVALID_ID, statusCode: 404, message: noID(INVALID_ID) });
    });

    test("Attempt to update billing info of a customer with no valid ID", { tag: "@regression" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateBillingInfo({ token: response.auth.token, userID: INVALID_ID, statusCode: 404, message: noID(INVALID_ID) });
    });

    test("Attempt to update credit card to empty string", { tag: "@regression" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateBillingInfo({ token: response.auth.token, userID: response.user.id, card_number: "", statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["NO_CARD_NUMBER"] });
    });

    test("Attempt to update credit card to a 5 digit number", { tag: "@regression" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateBillingInfo({ token: response.auth.token, userID: response.user.id, card_number: INVALID_BILLING_INFO["SHORT_CARD_NUMBER"], statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["SHORT_CARD_NUMBER"] });
    });

    test("Attempt to update credit card to a text value", { tag: "@regression" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateBillingInfo({ token: response.auth.token, userID: response.user.id, card_number: INVALID_BILLING_INFO["TEXT_CREDIT_CARD"], statusCode: 422 });
    });

    test("Attempt to update credit card to a 100 digit number", { tag: "@regression" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateBillingInfo({ token: response.auth.token, userID: response.user.id, card_number: INVALID_BILLING_INFO["LONG_CARD_NUMBER"], statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["LONG_CARD_NUMBER"] });
    });

    test("Attempt to update expiration date to invalid date format", { tag: "@regression" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateBillingInfo({ token: response.auth.token, userID: response.user.id, card_expiration_date: INVALID_BILLING_INFO["INVALID_EXPIRATION_DATE"], statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["INVALID_EXPIRATION_DATE"] });
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

import { test } from '../fixtures/basePage.js';
import { INVALID_BILLING_INFO, INVALID_ID } from '../fixtures/credentials.js';
import { ERROR_MESSAGES, noID } from '../fixtures/messages.js';

test.describe("Customer API tests regarding billing and shipping info", () => {

    let bearerToken;

    test.beforeEach("Get user token and ID", async ({ authAPI }) => {
        const response = await authAPI.login({});
        bearerToken = await response.auth.token;
    });

    test("Attempt to get billing info without a token", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.getBillingInfo({ token: "", statusCode: 401, message: ERROR_MESSAGES["UNAUTHENTICATED"] });
    });

    test("Attempt to get billing info of a customer with no valid ID", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.getBillingInfo({ token: bearerToken, userID: INVALID_ID, statusCode: 404, message: noID(INVALID_ID) });
    });

    test("Attempt to update billing info of a customer with no valid ID", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken, userID: INVALID_ID, statusCode: 404, message: noID(INVALID_ID) });
    });

    test("Attempt to update credit card to empty string", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken, card_number: "", statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["NO_CARD_NUMBER"] });
    });

    test("Attempt to update credit card to a 5 digit number", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken, card_number: INVALID_BILLING_INFO["SHORT_CARD_NUMBER"], statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["SHORT_CARD_NUMBER"] });
    });

    test("Attempt to update credit card to a text value", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken, card_number: INVALID_BILLING_INFO["TEXT_CREDIT_CARD"], statusCode: 422 });
    });

    test("Attempt to update credit card to a 100 digit number", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken, card_number: INVALID_BILLING_INFO["LONG_CARD_NUMBER"], statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["LONG_CARD_NUMBER"] });
    });

    test("Attempt to update expiration date to invalid date format", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken, card_expiration_date: INVALID_BILLING_INFO["INVALID_EXPIRATION_DATE"], statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["INVALID_EXPIRATION_DATE"] });
    });

    test("Attempt to update expiration date to past date", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken, card_expiration_date: INVALID_BILLING_INFO["EXPIRED_CARD"], statusCode: 422 });
    });

    test("Attempt to update cardholder to an integer", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken, cardholder: INVALID_BILLING_INFO["CARDHOLDER_INT"], statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["CARDHOLDER_INT"] });
    });

    test("Attempt to update cardholder to an string of numbers", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken, cardholder: INVALID_BILLING_INFO["CARDHOLDER_STRING_OF_NUMBERS"], statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["CARDHOLDER_INT"] });
    });

    test("Attempt to update cvv to a 10 digit number", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken, cvv: INVALID_BILLING_INFO["CARDHOLDER_STRING_OF_NUMBERS"], statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["INVALID_CVV"] });
    });

    test("Attempt to update cvv to a string", { tag: "@regression" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken, cvv: INVALID_BILLING_INFO["CVV_STRING"], statusCode: 422, message: ERROR_MESSAGES["GENERIC_ERROR"], error: ERROR_MESSAGES["STRING_CVV"] });
    });

    test("Get billing info of customer", { tag: "@smoke" }, async ({ customersAPI }) => {
        await customersAPI.getBillingInfo({ token: bearerToken });
    });

    test("Update billing info of customer", { tag: "@smoke" }, async ({ customersAPI }) => {
        await customersAPI.updateBillingInfo({ token: bearerToken });
    });

    test("Get shipping info of customer", { tag: "@smoke" }, async ({ customersAPI }) => {
        await customersAPI.getShippingInfo({ token: bearerToken });
    });

    test("Update shipping info of customer", { tag: "@smoke" }, async ({ customersAPI }) => {
        await customersAPI.updateShippingInfo({ token: bearerToken });
    });
});

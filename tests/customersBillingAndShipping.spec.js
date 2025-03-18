import { test } from '../fixtures/basePage.js';

test.describe("Customer API tests regarding billing and shipping info", () => {

    test("Get billing info of customer", { tag: "@smoke" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.getBillingInfo({ token: response.auth.token, userID: response.user.id });
    });

    test("Update billing info of customer", { tag: "@smoke" }, async ({ authAPI, customersAPI }) => {
        const response = await authAPI.login({});
        await customersAPI.updateBillingInfo({ token: response.auth.token, userID: response.user.id });
    });

});

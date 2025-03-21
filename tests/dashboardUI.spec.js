import { expect } from "@playwright/test";
import { test } from "../fixtures/basePage.js";
import { AuthAPI } from "../modules/authAPI.js";

test.describe("Dasboard tests", () => {

    let bearerToken;
    let page;
    let authAPI;
    console.log(bearerToken);


    test.beforeAll("Check if token is expired and make new one if it is", async ({ browser }) => {
        page = await browser.newPage();
        authAPI = new AuthAPI(page);
        const response = await authAPI.login({});
        bearerToken = response.auth.token;
        await page.goto("/")
        await page.evaluate(bearerToken => { localStorage.setItem("token", bearerToken) }, bearerToken);
    });
    

    test.beforeEach("Go to dashboard", async ({}) => {
        let expToken = await authAPI.checkIfTokenIsExpired(bearerToken);
            console.log(bearerToken);    
        
        if(expToken || bearerToken == undefined) {
            const response = await authAPI.login({});
            bearerToken = response.auth.token;
            await page.evaluate(bearerToken => { localStorage.setItem("token", bearerToken) }, bearerToken);
            console.log("IM IN IF");
    }
        await page.goto("/dashboard");
    });

    test("Generic test", { tag: "@smoke" }, async ({}) => {
       await expect(page).toHaveURL("/dashboard");
    });

    test("Generic test 2", { tag: "@smoke" }, async({}) => {
        await expect(page).toHaveURL("/dashboard")
    })
});
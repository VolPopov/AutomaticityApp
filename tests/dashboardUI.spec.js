import { expect } from "@playwright/test";
import { test } from "../fixtures/basePage.js";
import { AuthUI } from "../modules/authUI.js";
import { AuthAPI } from "../modules/authAPI.js";
import { URLS } from "../fixtures/urls.js";

test.describe("Dasboard tests", () => {

    let page;
    let authUI;
    let authAPI;

    test.beforeAll("Log in", async ({ browser }) => {
        page = await browser.newPage();
        authUI = new AuthUI(page);
        authAPI = new AuthAPI(page);
        await page.goto(URLS["LOGIN_PAGE"]);
        await authUI.login({});
    });

    test.afterAll("Close page", async ({}) => {
        await page.close();
    });
     
     test.beforeEach("Check if token is expired, and if so make a new one", async ({}) => {
      
        let token = await page.evaluate(() => {
          return localStorage.getItem("token");
         });
        
         let expToken = await authAPI.checkIfTokenIsExpired(token);    
         if(expToken || token == undefined) {
             const response = await authAPI.login({});
             token = response.auth.token;
             await page.evaluate(token => { localStorage.setItem("token", token) }, token);
         }
     });

    test("Generic test 2", { tag: "@smoke" }, async({}) => {
        await page.goto(URLS["PROFILE"]);
        await expect(page).toHaveURL(URLS["PROFILE"]);
    });

    test("Generic test", { tag: "@smoke" }, async ({}) => {
       await page.goto(URLS["DASHBOARD"]);
       await expect(page).toHaveURL(URLS["DASHBOARD"]);
    });
});

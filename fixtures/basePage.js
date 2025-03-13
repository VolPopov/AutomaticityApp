import { test as baseTest } from '@playwright/test';
import { AuthAPI } from '../modules/authAPI.js';

export const test = baseTest.extend({
    authAPI: async ({ page }, use) => {
        await use(new AuthAPI(page));
    },
}); 

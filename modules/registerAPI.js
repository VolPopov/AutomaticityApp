import { expect } from "@playwright/test";
import { generateUserCredentials } from "../fixtures/credentials";
import { SUCCESS_MESSAGES } from "../fixtures/messages.js";

const { username1, email1, password1 } = generateUserCredentials(5);

export class RegisterAPI {
    constructor(page) {
      this.page = page;
    }
  
    async register({
      username = username1, 
      email = email1, 
      password = password1, 
      statusCode = 200, 
      status = SUCCESS_MESSAGES["BASIC_SUCCESS_MESSAGE"], 
      message = SUCCESS_MESSAGES["USER_CREATED_SUCCESSFULLY"], 
    }) {
      let response = await this.page.request.post('/api/v1/auth/register', {
        data: { username: username, email: email, password: password },
        headers: { Accept: 'application/json' },
      });
      
      expect(response.status()).toBe(statusCode);
  
      let responseJSON = await response.json();

      if(response.status() == 200) {
        expect(responseJSON).toEqual({
          status: expect.any(String), 
          message: expect.any(String), 
          user: {
            username: expect.any(String), 
            email: expect.any(String), 
            password: expect.any(String), 
            updated_at: expect.any(String), 
            created_at: expect.any(String), 
            id: expect.any(Number), 
          }, 
          auth: {
            token: expect.any(String), 
            type: expect.stringMatching("Bearer"),
          }
        });
      }

      if(response.status() == 422) {
        expect(responseJSON).toEqual({
          message: expect.any(String), 
          errors: expect.any(Object), 
        });
      }

      if(responseJSON.status != null) {
        expect(responseJSON.status).toBe(status);
      }

      if(responseJSON.message != null) {
        expect(responseJSON.message).toBe(message);
      }
      console.log(responseJSON);
      

      return responseJSON;
    }
  }
  
import { test, expect } from '@playwright/test';
import { VALID_USER_CREDENTIALS } from "../fixtures/credentials";
import { SUCCESS_MESSAGES } from '../fixtures/messages.js';

export class LoginAPI {
    constructor(page) {
      this.page = page;
    }
  
    async login({
      email = VALID_USER_CREDENTIALS["VALID_EMAIL"], 
      password = VALID_USER_CREDENTIALS["VALID_PASSWORD"], 
      statusCode = 200,  
      message = SUCCESS_MESSAGES["USER_LOGGED_IN"], 
      status = SUCCESS_MESSAGES["BASIC_SUCCESS_MESSAGE"], 
      error, 
    }) {
      let response = await this.page.request.post('/api/v1/auth/login', {
        data: { email: email, password: password,},
        headers: { Accept: 'application/json' }, 
      });
      
      expect(response.status()).toBe(statusCode);
     
      let responseJSON = await response.json();

      if(response.status() == 200) {
        expect(responseJSON).toEqual({
          status: expect.any(String), 
          message: expect.any(String), 
          user: {
            id: expect.any(Number), 
            username: expect.any(String), 
            email: expect.stringMatching(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), 
            email_verified_at: null, 
            password: expect.any(String), 
            created_at: expect.any(String), 
            updated_at: expect.any(String), 
          }, 
          auth: {
            token: expect.stringMatching(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/]*$/), 
            type: expect.stringMatching("Bearer"), 
          }
        });
      }

      if(response.status() == 401) {
        expect(responseJSON).toEqual({
          error: expect.any(String), 
        });
      }

       if(response.status() == 422) {
         expect(responseJSON).toEqual({
          message: expect.any(String), 
          errors: expect.any(Object), 
         });
       }

      if (responseJSON.message != null) {
      expect(responseJSON.message).toBe(message);
      }

      if(responseJSON.status != null) {
        expect(responseJSON.status).toBe(status);
      }

      if (responseJSON.error != null) {
        expect(responseJSON.error).toBe(error);
      }

      return responseJSON;
    }

    async logout({
      token, 
      statusCode = 200,
      message = SUCCESS_MESSAGES["USER_LOGGED_OUT"],
    }) {
      let response = await this.page.request.post('/api/v1/auth/logout', {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}`}, 
      });

      expect(response.status()).toBe(statusCode);

       let responseJSON = await response.json();
       
        if(response.status() == 200) {
         expect(responseJSON).toEqual({
          message: expect.any(String), 
         });
        }

        if(responseJSON.message != null) {
          expect(responseJSON.message).toBe(message);
        }
    }

    async profile({
      token, 
      statusCode = 200, 
      username, 
      email, 
    }) {
      let response = await this.page.request.post("/api/v1/auth/profile", {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }, 
      });

      expect(response.status()).toBe(statusCode);

      let responseJSON = await response.json();
      if(response.status() == 200) {
        expect(responseJSON).toEqual({
          id: expect.any(Number), 
          username: expect.any(String), 
          email: expect.any(String), 
          email_verified_at: null, 
          password: expect.any(String), 
          created_at: expect.any(String), 
          updated_at: expect.any(String), 
        });
      }

      if(responseJSON.username != null) {
        expect(responseJSON.username).toBe(username);
      }

      if(responseJSON.email != null) {
        expect(responseJSON.email).toBe(email);
      }
    }

    async refresh({
      statusCode = 200, 
      token, 
    }) {
      let response = await this.page.request.post("api/v1/auth/refresh", {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}`}
      });

      expect(response.status()).toBe(statusCode);
      let responseJSON = await response.json();
      
      if(response.status() == 200) {
        expect(responseJSON).toEqual({
          access_token: expect.stringMatching(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/]*$/), 
          token_type: expect.stringMatching("bearer"), 
          expires_in: expect.any(Number), 
        });
      }

      console.log(responseJSON);
      return responseJSON;
    }
  }
  
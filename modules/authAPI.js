import { expect } from '@playwright/test';
import { VALID_USER_CREDENTIALS, generateUserCredentials } from "../fixtures/credentials";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../fixtures/messages.js';

const { username1, email1, password1 } = generateUserCredentials(5);

export class AuthAPI {
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
        expect(responseJSON.message).toBe(message);
        expect(responseJSON.status).toBe(status);
      }

      if(response.status() == 401) {
        expect(responseJSON).toEqual({
          error: expect.any(String), 
        });
        expect(responseJSON.error).toBe(error);
      }

       if(response.status() == 422) {
         expect(responseJSON).toEqual({
          message: expect.any(String), 
          errors: expect.any(Object), 
         });
         expect(responseJSON.message).toBe(message);
       }

      return responseJSON;
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
              email: expect.stringMatching(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), 
              password: expect.any(String), 
              updated_at: expect.any(String), 
              created_at: expect.any(String), 
              id: expect.any(Number), 
            }, 
            auth: {
              token: expect.stringMatching(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/]*$/), 
              type: expect.stringMatching("Bearer"),
            }
          });
          expect(responseJSON.status).toBe(status);
          expect(responseJSON.message).toBe(message);
        }
  
        if(response.status() == 422) {
          expect(responseJSON).toEqual({
            message: expect.any(String), 
            errors: expect.any(Object), 
          });
          expect(responseJSON.message).toBe(message);
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
         expect(responseJSON.message).toBe(message);
        }

        if(response.status() == 500) {
          expect(responseJSON.message).toBe(message)
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
        expect(responseJSON.username).toBe(username);
        expect(responseJSON.email).toBe(email);
      }

       if(response.status() == 500) {
         expect(responseJSON.message).toBe(ERROR_MESSAGES["INVALID_TOKEN"]);
       }
    }

    async refresh({
      statusCode = 200, 
      token, 
      message, 
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

      if(response.status() == 500) {
        expect(responseJSON.message).toBe(message);
      }
      return responseJSON;
    }

    async delete({
      userID, 
      statusCode = 200, 
      token, 
    }) {
      let response = await this.page.request.delete(`api/v1/customers/${userID}`, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      });

      expect(response.status()).toBe(statusCode);
      let responseJSON = await response.json();
      if(response.status == 200) {
        expect(responseJSON).toEqual({
          status: expect.any(String), 
          message: expect.any(String), 
          customer: {
            id: expect.any(Number), 
            user_id: expect.any(Number), 
            cart_id: null, 
            username: expect.any(String), 
            first_name: null, 
            last_name: null, 
            email: expect.stringMatching(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), 
            password: expect.any(String), 
            date_of_birth: null, 
            created_at: expect.any(String), 
            updated_at: expect.any(String), 
            billing_info: null, 
            shipping_info: null, 
          }
        });
        expect(responseJSON.customer.userID).toBe(userID);
      }

      return responseJSON;     
    }

    async getCustomers({
      token, 
      statusCode = 200, 
    }) {
      let response = await this.page.request.get("api/v1/customers", {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }, 
      });

      expect(response.status()).toBe(statusCode);
      let responseJSON = await response.json();   
      return responseJSON;
    }

    async getSpecificCustomer({
      token, 
      userID, 
      statusCode = 200, 
    }) {
      let response = await this.page.request.get(`api/v1/customers/${userID}`, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }, 
      });

      expect(response.status()).toBe(statusCode);
      let responseJSON = await response.json();
      return responseJSON;
    }
  }

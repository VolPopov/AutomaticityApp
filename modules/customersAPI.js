import { expect } from '@playwright/test';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../fixtures/messages.js';
import { CUSTOMER_FOR_UPDATES, generateUserCredentials } from '../fixtures/credentials.js';

const { username1, email1 } = generateUserCredentials(5);

export class CustomersAPI {
    constructor(page) {
        this.page = page;
        this.endpoint = "/api/v1/customers";
      }
  
      getAcceptHeader() {
        return "application/json";
      }
  
      getAuthorizationHeader(token) {
        return `Bearer ${token}`;
      }

  async getCustomers({
    token, 
    statusCode = 200, 
    message = SUCCESS_MESSAGES["BASIC_SUCCESS_MESSAGE"], 
  }) {
    let response = await this.page.request.get(`${this.endpoint}`, {
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) }, 
    });

    expect(response.status()).toBe(statusCode);
    let responseJSON = await response.json();   

    if (statusCode == 200) {
      expect(responseJSON.status).toBe(message);
    }

    if(statusCode != 200) {

      switch(response.status()) {

        case 401:
        expect(responseJSON).toEqual({
        message: expect.any(String), 
        });
        expect(responseJSON.message).toBe(message);
        break;

        case 405:
        expect(responseJSON).toEqual({
        error: expect.any(String), 
        });
        expect(responseJSON.error).toBe(message);
        break;

        case 500:
        expect(responseJSON).toEqual({
        message: expect.any(String), 
        });
        expect(responseJSON.message).toBe(message);
        break;

      }
    }
    
    console.log(responseJSON);
    
    return responseJSON;
  }

  async invalidGetCustomers({
    statusCode = 405, 
    token, 
    method, 
    error = ERROR_MESSAGES["METHOD_NOT_ALLOWED"], 
  }) {
    let response;

    switch(method) {

      case("post"): 
      response = await this.page.request.post(`${this.endpoint}`, {
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) }, 
      });
      break;

      case("put"): 
      response = await this.page.request.put(`${this.endpoint}`, {
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) }, 
      });
      break;

      case("patch"): 
      response = await this.page.request.patch(`${this.endpoint}`, {
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) }, 
      });
      break;

      case("delete"): 
      response = await this.page.request.post(`${this.endpoint}`, {
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) }, 
      });
      break;
    }

    expect(response.status()).toBe(statusCode);
    let responseJSON = await response.json();
    if( statusCode == 405) {
      expect(responseJSON).toEqual({
        error: expect.any(String)
      });
      expect(responseJSON.error).toBe(error);
    }
    console.log(responseJSON);
    return responseJSON;
  }

  async getSpecificCustomer({
    token, 
    userID, 
    statusCode = 200, 
    message = SUCCESS_MESSAGES["BASIC_SUCCESS_MESSAGE"], 
  }) {
    let response = await this.page.request.get(`${this.endpoint}/${userID}`, {
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) }, 
    });

    expect(response.status()).toBe(statusCode);
    let responseJSON = await response.json();

    if(statusCode == 200) {
      expect(responseJSON).toEqual({
        status: expect.any(String), 
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
        }
      });
      expect(responseJSON.status).toBe(message);
      expect(responseJSON.customer.id).toBe(userID);
    }

    if(statusCode != 200) {

      switch(response.status()) {

        case 401:
        expect(responseJSON).toEqual({
        message: expect.any(String), 
        });
        expect(responseJSON.message).toBe(message);
        break;

        case 404:
        expect(responseJSON).toEqual({
        error: expect.any(String), 
        });
        expect(responseJSON.error).toBe(message);
        break;  

        case 405:
        expect(responseJSON).toEqual({
        error: expect.any(String), 
        });
        expect(responseJSON.error).toBe(message);
        break;

        case 500:
        expect(responseJSON).toEqual({
        message: expect.any(String), 
        });
        expect(responseJSON.message).toBe(message);
        break;

      }
    }
    console.log(responseJSON);
    
    return responseJSON;
  }

  async updateCustomer({
    token, 
    userID = CUSTOMER_FOR_UPDATES["ID"], 
    statusCode = 200, 
    message = SUCCESS_MESSAGES["BASIC_SUCCESS_MESSAGE"], 
  }) {
    let response = await this.page.request.put(`${this.endpoint}/${userID}`, {
    data: { username: username1, email: email1 }, 
    headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) }, 
    });

    expect(response.status()).toBe(statusCode);
    let responseJSON = await response.json();
    if (statusCode == 200) {
      expect(responseJSON).toEqual({
        status: expect.any(String), 
        message: expect.any(String), 
        customer: expect.any(Object), 
        cart: expect.any(Object), 
      });
    }

     if (statusCode != 200) {
       switch(response.status()) {

         case 401:
          expect(responseJSON).toEqual({
          message: expect.any(String), 
          });
          expect(responseJSON.message).toBe(message);
          break;

          case 404:
          expect(responseJSON).toEqual({
            status: expect.any(String), 
            message: expect.any(String), 
          });
          expect(responseJSON.status).toBe("error");
          expect(responseJSON.message).toBe(message);
          break;

          case 405:
          expect(responseJSON).toEqual({
            message: expect.any(String), 
          });
          expect(responseJSON.message).toBe(message);
          
          case 422: 
          expect(responseJSON).toEqual({
            message: expect.any(String), 
            errors: expect.any(Object), 
          });
          //expect.....
          break;

          case 500: 
          expect(responseJSON.message).toBe(message)
          break;
       }
     }

    console.log(responseJSON);
    return responseJSON
  }

  async delete({
    userID, 
    statusCode = 200, 
    token, 
  }) {
    let response = await this.page.request.delete(`${this.endpoint}/${userID}`, {
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) },
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
    console.log(responseJSON);
    
    return responseJSON;     
  }
}

import { expect } from '@playwright/test';
import { billingInfoMessage, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../fixtures/messages.js';
import { CUSTOMER_FOR_UPDATES, generateUserCredentials, VALID_BILLING_INFO, VALID_USER_CREDENTIALS } from '../fixtures/credentials.js';
import { error } from 'console';

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

      expect(Object.keys(responseJSON).includes("status")).toBeTruthy();
      expect(responseJSON.status).toEqual(expect.any(String));
      expect(Object.keys(responseJSON).includes("customer")).toBeTruthy();
      expect(Object.keys(responseJSON.customer).includes("id")).toBeTruthy();
      expect(responseJSON.customer.id).toEqual(expect.any(Number));
      expect(Object.keys(responseJSON.customer).includes("user_id")).toBeTruthy();
      expect(responseJSON.customer.user_id).toEqual(expect.any(Number));
      expect(Object.keys(responseJSON.customer).includes("cart_id")).toBeTruthy();
      expect(Object.keys(responseJSON.customer).includes("username")).toBeTruthy();
      expect(responseJSON.customer.username).toEqual(expect.any(String));
      expect(Object.keys(responseJSON.customer).includes("first_name")).toBeTruthy();
      expect(Object.keys(responseJSON.customer).includes("last_name")).toBeTruthy();
      expect(Object.keys(responseJSON.customer).includes("email")).toBeTruthy();
      expect(responseJSON.customer.email).toEqual(expect.stringMatching(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
      expect(Object.keys(responseJSON.customer).includes("password")).toBeTruthy();
      expect(responseJSON.customer.password).toEqual(expect.any(String));
      expect(Object.keys(responseJSON.customer).includes("date_of_birth")).toBeTruthy();
      expect(Object.keys(responseJSON.customer).includes("created_at")).toBeTruthy();
      expect(responseJSON.customer.created_at).toEqual(expect.any(String));
      expect(Object.keys(responseJSON.customer).includes("updated_at")).toBeTruthy();
      expect(responseJSON.customer.updated_at).toEqual(expect.any(String));
      
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
    username = username1, 
    email = email1, 
    password = VALID_USER_CREDENTIALS["VALID_PASSWORD"], 
  }) {
    let response = await this.page.request.put(`${this.endpoint}/${userID}`, {
    data: { username: username, email: email, password: password }, 
    headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) }, 
    });

    let responseJSON = await response.json();
    console.log(responseJSON);
    

    expect(response.status()).toBe(statusCode);
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
            error: expect.any(String), 
          });
          expect(responseJSON.error).toBe(message);
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
          expect(responseJSON.message).toBe(message);
          break;

          case 500: 
          expect(responseJSON.message).toBe(message)
          break;
       }
     }

    return responseJSON;
  }

  async delete({
    userID, 
    statusCode = 200, 
    token, 
    message = SUCCESS_MESSAGES["CUSTOMER_DELETED"], 
  }) {
    let response = await this.page.request.delete(`${this.endpoint}/${userID}`, {
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) },
    });

    expect(response.status()).toBe(statusCode);
    let responseJSON = await response.json();
    if(response.status() == 200) {
      expect(Object.keys(responseJSON).includes("status")).toBeTruthy();
      expect(responseJSON.status).toEqual(expect.any(String));
      expect(Object.keys(responseJSON).includes("message")).toBeTruthy();
      expect(responseJSON.message).toEqual(expect.any(String));
      expect(Object.keys(responseJSON).includes("customer")).toBeTruthy();
      expect(Object.keys(responseJSON.customer).includes("id")).toBeTruthy();
      expect(responseJSON.customer.id).toEqual(expect.any(Number));
      expect(Object.keys(responseJSON.customer).includes("user_id")).toBeTruthy();
      expect(responseJSON.customer.user_id).toEqual(expect.any(Number));
      expect(Object.keys(responseJSON.customer).includes("cart_id")).toBeTruthy();
      expect(Object.keys(responseJSON.customer).includes("username")).toBeTruthy();
      expect(responseJSON.customer.username).toEqual(expect.any(String));
      expect(Object.keys(responseJSON.customer).includes("first_name")).toBeTruthy();
      expect(Object.keys(responseJSON.customer).includes("last_name")).toBeTruthy();
      expect(Object.keys(responseJSON.customer).includes("email")).toBeTruthy();
      expect(responseJSON.customer.email).toEqual(expect.stringMatching(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
      expect(Object.keys(responseJSON.customer).includes("password")).toBeTruthy();
      expect(responseJSON.customer.password).toEqual(expect.any(String));
      expect(Object.keys(responseJSON.customer).includes("date_of_birth")).toBeTruthy();
      expect(Object.keys(responseJSON.customer).includes("created_at")).toBeTruthy();
      expect(responseJSON.customer.created_at).toEqual(expect.any(String));
      expect(Object.keys(responseJSON.customer).includes("updated_at")).toBeTruthy();
      expect(responseJSON.customer.updated_at).toEqual(expect.any(String));
      expect(Object.keys(responseJSON.customer).includes("billing_info")).toBeTruthy();
      expect(Object.keys(responseJSON.customer).includes("shipping_info")).toBeTruthy();

      expect(responseJSON.customer.id).toBe(userID);
      expect(responseJSON.message).toBe(message);
    }

    if(response.status() != 200) {
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
           message: expect.any(String), 
         });
         expect(responseJSON.message).toBe(message);

         case 500: 
         expect(responseJSON.message).toBe(message)
         break;
      }
    }
    
    console.log(responseJSON);
    
    return responseJSON;     
  }

  async getBillingInfo({
    userID, 
    statusCode = 200, 
    token, 
    status = SUCCESS_MESSAGES["BASIC_SUCCESS_MESSAGE"], 
    message = billingInfoMessage(userID), 
  }) {
    let response = await this.page.request.get(`${this.endpoint}/${userID}/billing-info`, {
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) },
    });
    let responseJSON = await response.json();
    console.log(responseJSON);
    expect(response.status()).toBe(statusCode);

    if(response.status() == 200) {
      expect(responseJSON).toEqual({
        status: expect.any(String), 
        message: expect.any(String), 
        billing_info: expect.any(Object), 
      });
      expect(responseJSON.status).toBe(status);
      expect(responseJSON.message).toBe(message);
    }

    if(response.status() != 200) {
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

      }
    }
    
    
    return responseJSON;
  }

  async updateBillingInfo({
    userID, 
    statusCode = 200, 
    token, 
    status = SUCCESS_MESSAGES["BASIC_SUCCESS_MESSAGE"], 
    message = SUCCESS_MESSAGES["UPDATED_BILLING_INFO"], 
    error,  
    cardholder = VALID_BILLING_INFO["CARDHOLDER"], 
    card_type = VALID_BILLING_INFO["CARD_TYPE"], 
    card_number = VALID_BILLING_INFO["CARD_NUMBER"], 
    cvv = VALID_BILLING_INFO["CVV"], 
    card_expiration_date = VALID_BILLING_INFO["EXPIRATION_DATE"], 
  }) {
    let response = await this.page.request.put(`${this.endpoint}/${userID}/billing-info`, { 
      data: { cardholder: cardholder, card_type: card_type, card_number: card_number, cvv: cvv, card_expiration_date: card_expiration_date }, 
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) }, 
    });

    let responseJSON = await response.json();
    console.log(responseJSON);
    
    expect(response.status()).toBe(statusCode);

    if(response.status() == 200) {
      expect(responseJSON).toEqual({
        status: expect.any(String), 
        message: expect.any(String), 
        billing_info: expect.any(Object), 
      });
      expect(responseJSON.status).toBe(status);
      expect(responseJSON.message).toBe(message);
      expect(responseJSON.billing_info.customer_id).toBe(userID);
      expect(responseJSON.billing_info.cardholder).toBe(cardholder);
      expect(responseJSON.billing_info.card_type).toBe(card_type);
      expect(responseJSON.billing_info.card_number).toBe(card_number);
      expect(responseJSON.billing_info.cvv).toBe(cvv);
      expect(responseJSON.billing_info.card_expiration_date).toBe(card_expiration_date);
    }

    if (response.status() != 200) {
      switch(response.status()) {
        case 404: 
        expect(responseJSON).toEqual({
          error: expect.any(String), 
        });
        expect(responseJSON.error).toBe(message);
        break;

        case 422: 
        expect(responseJSON).toEqual({
          status: expect.any(String), 
          errors: expect.any(Object), 
        });
        expect(responseJSON.status).toBe(message);

        if (responseJSON.errors.cardholder != undefined) {
          expect(responseJSON.errors.cardholder).toContain(error);
        }
        if (responseJSON.errors.card_number != undefined) {
          expect(responseJSON.errors.card_number).toContain(error);
        }
        if (responseJSON.errors.card_type != undefined) {
          expect(responseJSON.errors.card_type).toContain(error);
        }
        if (responseJSON.errors.cvv != undefined) {
          expect(responseJSON.errors.cvv).toContain(error);
        }
        if (responseJSON.errors.card_expiration_date != undefined) {
          expect(responseJSON.errors.card_expiration_date).toContain(error);
        }
        
        break;

      }
    }
    return responseJSON;
    
  }
}

import { expect } from '@playwright/test';

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

    return responseJSON;     
  }

  async getCustomers({
    token, 
    statusCode = 200, 
  }) {
    let response = await this.page.request.get(`${this.endpoint}`, {
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) }, 
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
    let response = await this.page.request.get(`${this.endpoint}/${userID}`, {
      headers: { Accept: this.getAcceptHeader(), Authorization: this.getAuthorizationHeader(token) }, 
    });

    expect(response.status()).toBe(statusCode);
    let responseJSON = await response.json();
    return responseJSON;
  }
}

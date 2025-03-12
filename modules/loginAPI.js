import { VALID_USER_CREDENTIALS } from "../fixtures/credentials";

export class LoginAPI {
    constructor(page) {
      this.page = page;
    }
  
    async login({
      email = VALID_USER_CREDENTIALS["VALID_EMAIL"], 
      password = VALID_USER_CREDENTIALS["VALID_PASSWORD"], 
    }) {
      let response = await this.page.request.post('/api/v1/auth/login', {
        data: { email: email, password: password },
        headers: { Accept: 'application/json' },
      });
  
      let responseJSON = await response.json();
      return responseJSON;
    }
  }
  
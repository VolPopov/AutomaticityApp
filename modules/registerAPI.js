import { generateUserCredentials } from "../fixtures/credentials";

const { username1, email1, password1 } = generateUserCredentials(5);

export class RegisterAPI {
    constructor(page) {
      this.page = page;
    }
  
    async register({
      username = username1, 
      email = email1, 
      password = password1,
    }) {
      let response = await this.page.request.post('/api/v1/auth/register', {
        data: { username: username, email: email, password: password },
        headers: { Accept: 'application/json' },
      });
  
      let responseJSON = await response.json();

      return responseJSON;
    }
  }
  
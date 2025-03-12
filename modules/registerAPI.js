export class RegisterAPI {
    constructor(page) {
      this.page = page;
    }
  
    async register(username, email, password) {
      let response = await this.page.request.post('/api/v1/auth/register', {
        data: { username: username, email: email, password: password },
        headers: { Accept: 'application/json' },
      });
  
      let responseJSON = await response.json();

      return responseJSON;
    }
  }
  
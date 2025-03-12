export class LoginAPI {
    constructor(page) {
      this.page = page;
    }
  
    async login(email, password) {
      let response = await this.page.request.post('/api/v1/auth/login', {
        data: { email: email, password: password },
        headers: { Accept: 'application/json' },
      });
  
      let responseJSON = await response.json();
      return responseJSON;
    }
  }
  
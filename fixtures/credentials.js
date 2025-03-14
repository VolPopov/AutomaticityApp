const generateRandomString = length => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const generateUserCredentials = length => {
    const baseString = generateRandomString(length);
  
    const username1 = baseString;
    const email1 = `${baseString}@gmail.com`;
    const password1 = `${baseString}123`;
  
    return { username1, email1, password1 };
  };

const VALID_USER_CREDENTIALS = {
    VALID_USERNAME: "Vol", 
    VALID_EMAIL: "VolPopov@gmail.com", 
    VALID_PASSWORD: "pass123",
};

const INVALID_USER_CREDENTIALS = {
    INCORRECT_PASSWORD_FOR_VALID_USER: "wrong1212", 
    INVALID_MAIL_FORMAT: "mailWithNoAtSymbol.com", 
    VALID_MAIL_BUT_NOT_REGISTERED: `${generateRandomString(10)}@gmail.com`, 
    SHORT_PASSWORD: generateRandomString(3), 
    LONG_PASSWORD: generateRandomString(1000), 
    LONG_EMAIL: `${generateRandomString(1000)}@gmail.com`, 
    LONG_USERNAME: generateRandomString(1000), 
    INVALID_TOKEN: generateRandomString(10), 
    EXPIRED_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXV0b21hdGljaXR5YWNhZGVteS5uZ3Jvay5hcHAvYXBpL3YxL2F1dGgvcmVnaXN0ZXIiLCJpYXQiOjE3NDE5NTU5NDIsImV4cCI6MTc0MTk1OTU0MiwibmJmIjoxNzQxOTU1OTQyLCJqdGkiOiI1NDR1WEJrS0lmbFYzNFNCIiwic3ViIjoiNTYiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.zKBRFVT6PwOwRI3mhOn0O-uyfU3Ts8BPwcbMLwDDbys", 
};

export { VALID_USER_CREDENTIALS, INVALID_USER_CREDENTIALS, generateUserCredentials }
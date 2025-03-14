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
    VALID_MAIL_BUT_NOT_REGISTERED: "thisMailIsNotRegistered@gmail.com", 
    SHORT_PASSWORD: "Pas", 
    LONG_PASSWORD: generateRandomString(1000), 
    INVALID_TOKEN: "ThisIsAnInvalidTokenFormat", 
};

export {VALID_USER_CREDENTIALS, INVALID_USER_CREDENTIALS, generateUserCredentials}
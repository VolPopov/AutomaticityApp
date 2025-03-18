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

  const generateRandomInt = length => {
    const characters =
      '123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const generateRandomStringNoNumbers = length => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };
  
  function getCardType() {
    let card = ["Visa", "Mastercard", "Discover", "American Express"];
    const randomIndex = Math.floor(Math.random() * 4);
    return card[randomIndex];
  }
  
  const generateUserCredentials = length => {
    const baseString = generateRandomString(length);
  
    const username1 = baseString;
    const email1 = `${baseString}@gmail.com`;
    const password1 = `${baseString}123`;
  
    return { username1, email1, password1 };
  };

const VALID_USER_CREDENTIALS = {
    VALID_ID: 37, 
    VALID_USERNAME: "Vol", 
    VALID_EMAIL: "VolPopov@gmail.com", 
    VALID_PASSWORD: "pass123",
};

const CUSTOMER_FOR_UPDATES = {
  ID: 119, 
}

const INVALID_ID = 23;

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

const VALID_BILLING_INFO = {
  CARDHOLDER: generateRandomStringNoNumbers(10), 
  CARD_TYPE: getCardType(), 
  CARD_NUMBER: generateRandomInt(16), 
  CVV: generateRandomInt(3), 
  EXPIRATION_DATE: "07/29", 
}

const INVALID_BILLING_INFO = {
  SHORT_CARD_NUMBER: generateRandomInt(5), 
  TEXT_CREDIT_CARD: generateRandomStringNoNumbers(16), 
  LONG_CARD_NUMBER: generateRandomInt(100),  
  INVALID_EXPIRATION_DATE: generateRandomInt(4), 
  EXPIRED_CARD: "01/24", 
  CARDHOLDER_INT: Math.floor(generateRandomInt(10)), 
  CARDHOLDER_STRING_OF_NUMBERS: generateRandomInt(10), 
  CVV_STRING: generateRandomStringNoNumbers(3), 
}

const VALID_SHIPPING_INFO = {
  FIRST_NAME: generateRandomStringNoNumbers(8), 
  LAST_NAME: generateRandomStringNoNumbers(8), 
  EMAIL: `${generateRandomStringNoNumbers(5)}@gmail.com`, 
  STREET_AND_NUMBER: `${generateRandomStringNoNumbers(6)} ${generateRandomInt(2)}`, 
  PHONE_NUMBER: generateRandomInt(10), 
  CITY: generateRandomStringNoNumbers(5), 
  POSTAL_CODE: generateRandomInt(5), 
  COUNTRY: generateRandomStringNoNumbers(7), 
}

export { VALID_USER_CREDENTIALS, INVALID_USER_CREDENTIALS, generateUserCredentials, CUSTOMER_FOR_UPDATES, INVALID_ID, VALID_BILLING_INFO, INVALID_BILLING_INFO, VALID_SHIPPING_INFO }

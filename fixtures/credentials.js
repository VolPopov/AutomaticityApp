const VALID_USER_CREDENTIALS = {
    VALID_EMAIL: "filip@test.com", 
    VALID_PASSWORD: "test123",
};

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
  
    const username = baseString;
    const email = `${baseString}@gmail.com`;
    const password = `${baseString}123`;
  
    return { username, email, password };
  };

export {VALID_USER_CREDENTIALS, generateUserCredentials}
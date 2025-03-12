const SUCCESS_MESSAGES = {
    BASIC_SUCCESS_MESSAGE: "Success", 
    USER_CREATED_SUCCESSFULLY: "User created successfully",
    USER_LOGGED_IN: "User logged in successfully",
};

const ERROR_MESSAGES = {
    EMAIL_AND_PASSWORD_BOTH_MISSING: "The email field is required. (and 1 more error)", 
    EMAIL_MISSING: "The email field is required.", 
    PASSWORD_MISSING: "The password field is required.", 
    UNAUTHORIZED: "Unauthorized", 
    INVALID_MAIL_FORMAT: "The email field must be a valid email address.", 
};

export{SUCCESS_MESSAGES, ERROR_MESSAGES};
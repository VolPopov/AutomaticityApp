const SUCCESS_MESSAGES = {
    BASIC_SUCCESS_MESSAGE: "Success", 
    USER_CREATED_SUCCESSFULLY: "User created successfully",
    USER_LOGGED_IN: "User logged in successfully", 
    USER_LOGGED_OUT: "Successfully logged out", 
};

const ERROR_MESSAGES = {
    USERNAME_EMAIL_AND_PASSWORD_ALL_MISSING: "The username field is required. (and 2 more errors)",
    EMAIL_AND_PASSWORD_BOTH_MISSING: "The email field is required. (and 1 more error)", 
    USERNAME_MISSING: "The username field is required.",
    EMAIL_MISSING: "The email field is required.", 
    PASSWORD_MISSING: "The password field is required.", 
    UNAUTHORIZED: "Unauthorized", 
    INVALID_MAIL_FORMAT_FOR_LOGIN: "The email field must be a valid email address.", 
    INVALID_MAIL_FORMAT_FOR_REGISTER: "The email field format is invalid.",
    PASSWORD_TOO_SHORT: "The password field must be at least 6 characters.", 
    TAKEN_USERNAME: "The username has already been taken.",
    TAKEN_EMAIL: "The email has already been taken.", 
    USER_ALREADY_EXISTS: "The username has already been taken. (and 1 more error)", 
    INVALID_TOKEN: "Token could not be parsed from the request.", 
    EXPIRED_TOKEN: "Token has expired", 
    METHOD_NOT_ALLOWED: "Method Not Allowed", 
    LONG_USERNAME: "The username field must not be greater than 255 characters.", 
};

export{ SUCCESS_MESSAGES, ERROR_MESSAGES };

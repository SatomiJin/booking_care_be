const PATH_MESSAGE_ERROR = {
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal Server Error",
  },
  // --------------------------------------------------------
  // USER
  //---------------------------------------------------------
  //create
  EMAIL_ALREADY_EXISTS: {
    code: "EMAIL_ALREADY_EXISTS",
    message: "The email address is already in use.",
  },
  CREATE_USER_FAILED: {
    code: "CREATE_USER_FAILED",
    message: "Failed to create user, please try again.",
  },
  CREATE_USER_SUCCESS: {
    code: "CREATE_USER_SUCCESS",
    message: "User created successfully.",
  },
  //login
  REQUIRE_CREDENTIALS: {
    code: "REQUIRE_CREDENTIALS",
    message: "Email and password are required",
  },
  INVALID_CREDENTIALS: {
    code: "INVALID_CREDENTIALS",
    message: "Invalid username or password",
  },
  USER_DEACTIVATED: {
    code: "USER_DEACTIVATED",
    message: "User account is deactivated! Please contact support.",
  },

  LOGIN_SUCCESS: {
    code: "LOGIN_SUCCESS",
    message: "Login successful",
  },
};

module.exports = {
  PATH_MESSAGE_ERROR,
};

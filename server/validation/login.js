const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput(data) {
  data.emailOrUsername = validText(data.emailOrUsername) ? data.emailOrUsername : "";
  data.password = validText(data.password) ? data.password : "";

  if (Validator.isEmpty(data.emailOrUsername)) {
    return { message: "Email/Username field is required", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};


const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateInputs(data) {
  data.email = validText(data.email) ? data.email : "";
  data.username = validText(data.username) ? data.username : "";
  data.password = validText(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    return { message: "Email is invalid", isValid: false };
  }

  if (Validator.isEmpty(data.email)) {
    return { message: "Email field is required", isValid: false };
  }
  if (Validator.isEmpty(data.username)) {
    return { message: "Name field is required", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  if (Validator.isEmpty(data.password2)) {
    return { message: "Please confirm password", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};

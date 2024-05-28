import Validations from "./Validations";

export default class LoginValidations {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  checkValidations() {
    let errors = [];

    // email validations
    if (!Validations.checkEmail(this.email)) {
      errors["email"] = "Invalid Email";
    }
    // passsword validations
    if (Validations.minLength(this.password, 6)) {
      errors["password"] = "password should be of 6 characters";
    }

    return errors;
  }
}

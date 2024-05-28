import Validations from "./Validations";

export default class SignupValidations {
  constructor(name, email, password) {
    (this.name = name), (this.email = email), (this.password = password);
  }

  checkValidations() {
    let errors = [];

    // name validations
    if (!Validations.isAlphabetic(this.name)) {
      errors["name"] = "Invalid name";
    }

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

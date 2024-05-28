export default class Validations {
  static checkEmail(email) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  static minLength(name, minLength) {
    if (name.length < minLength) {
      return true;
    } else return false;
  }

  static isAlphabetic(name) {
    const alphabeticRegex = /^[A-Za-z]+$/;
    return alphabeticRegex.test(name);
  }
}

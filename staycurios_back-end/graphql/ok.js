const validator = require("validator");
const errors = [];

let email = "foo+bar@gmail.com";
let password = " fh";

if (validator.isEmail(email)) {
  errors.push({ message: "E-mail is invalid." });
  let ismail = validator.normalizeEmail(email);
  console.log(ismail);
}

if (
  validator.isEmpty(password) ||
  !validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
) {
  errors.push({
    message:
      "Password is too short, must 8 characters with lowercase uppercase and symbols",
  });
}

console.log(validator.ltrim(password));
console.log(validator.isEmpty(password));
console.log(
  validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
);
console.log(errors);

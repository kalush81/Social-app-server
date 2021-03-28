const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateUN = (username) => {
  return username.length < 20 && username.length > 3;
};
const validateEmail = (email) => {
  return email.match(mailformat);
};
const checkPSDLength = (password) => {
  return password.length > 30 || password.length < 4;
};

module.exports = {
  validUserName: validateUN,
  validEmail: validateEmail,
  passwordTooLongOrTooShort: checkPSDLength,
};

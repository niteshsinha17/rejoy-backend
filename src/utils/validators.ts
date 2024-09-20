//  only alphanumeric, number, dot and underscore is allowed
export const USERNAME_REGEX = /^[a-zA-Z0-9._]{1,30}$/;

export const validateUsername = (username: string) => {
  return USERNAME_REGEX.test(username);
};

export const validatePassword = (password: string) => {
  // Check if the password length is at least 8 characters
  if (password.length < 8) {
    return false;
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one lowercase letter and one number
  if (!/[a-z]/.test(password) || !/\d/.test(password)) {
    return false;
  }

  // All criteria met, password is valid
  return true;
};
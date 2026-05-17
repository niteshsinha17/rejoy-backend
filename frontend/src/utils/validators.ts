//  only alphanumeric, number, dot and underscore is allowed
export const USERNAME_REGEX = /^[a-zA-Z0-9._]{1,30}$/;

export const validateUsername = (username: string) => {
  return USERNAME_REGEX.test(username);
};

export const PASSWORD_MIN_LENGTH = 4;

export const validatePassword = (password: string) => {
  return password.length >= PASSWORD_MIN_LENGTH;
};

type IStorageKey = "userToken" | "guestUserToken" | "conversationMessages";

export const localStorageTransaction = {
  getItem(key: IStorageKey) {
    return window?.localStorage.getItem(key);
  },
  setItem(key: IStorageKey, value: string) {
    return window?.localStorage.setItem(key, value);
  },
  removeItem(key: IStorageKey) {
    return window?.localStorage.removeItem(key);
  },
  clear() {
    return window?.localStorage.clear();
  },
};

class LocalStorage {
  constructor(key) {
    this.key = key;
  }
  getToken() {
    if (typeof window !== "undefined") return localStorage?.getItem(this.key);
  }
  setToken(value) {
    if (typeof window !== "undefined")
      return localStorage?.setItem(this.key, value);
  }
  removeToken() {
    if (typeof window !== "undefined")
      return localStorage?.removeItem(this.key);
  }
}
export default new LocalStorage("auth-header");

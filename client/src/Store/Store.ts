import { makeAutoObservable } from "mobx";

export default class Store {
  isAuth = false;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setIsAuth(bool: boolean) {
    this.isAuth = bool;
  }

  async login() {
    try {
      localStorage.setItem("auth", "true");
      this.setIsLoading(true);
      this.setIsAuth(true);
    } catch (error) {
      console.error("Ошибка, ", error);
    }
  }

  async registration() {
    try {
      localStorage.setItem("auth", "true");
      this.setIsLoading(true);
      this.setIsAuth(true);
    } catch (error) {
      console.error("Ошибка, ", error);
    }
  }

  async logout() {
    try {
      localStorage.removeItem("auth");
      this.setIsLoading(true);
      this.setIsAuth(false);
    } catch (error) {
      console.error("Ошибка, ", error);
    }
  }
}

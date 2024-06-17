import { makeAutoObservable } from "mobx";

export default class Store {
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }
}

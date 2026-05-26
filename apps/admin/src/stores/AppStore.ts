import { ApiCategory, getCategories } from "@ministor/api";
import { action, makeObservable, observable, runInAction } from "mobx";

export class AppStore {
  @observable
  categories: Array<ApiCategory> = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  async loadCategories() {
    const categories = await getCategories();

    runInAction(() => {
      this.categories = categories;
    });
  }
}

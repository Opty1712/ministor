import {
  getCategories,
  getMyApps,
  type Category,
  type EditorApp,
} from "@ministor/api";
import { action, makeObservable, observable, runInAction } from "mobx";

export class AppStore {
  @observable
  apps: Array<EditorApp> = [];
  @observable
  categories: Array<Category> = [];
  @observable
  isLoading = false;
  @observable
  loadError = "";
  @observable
  categoriesLoadError = "";

  constructor() {
    makeObservable(this);
  }

  @action.bound
  async loadApps(token: string) {
    this.isLoading = true;
    this.loadError = "";

    try {
      const apps = await getMyApps(token);

      runInAction(() => {
        this.apps = apps;
      });
    } catch {
      runInAction(() => {
        this.loadError = "Не удалось загрузить приложения.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  @action.bound
  async loadCategories() {
    this.categoriesLoadError = "";

    try {
      const categories = await getCategories();

      runInAction(() => {
        this.categories = categories;
      });
    } catch {
      runInAction(() => {
        this.categoriesLoadError = "Не удалось загрузить категории.";
      });
    }
  }
}

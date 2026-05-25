import { CatalogApp, Category, getApps, getCategories } from "@ministor/api";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export class CatalogStore {
  @observable apps: Array<CatalogApp> = [];
  @observable
  categories: Array<Category> = [];
  @observable isLoading = false;
  @observable loadError = "";
  @observable searchText = "";
  @observable freeOnly = false;
  @observable categoryId = "";

  private appsRequestId = 0;

  constructor() {
    makeObservable(this);
  }

  @computed
  get isEmpty() {
    return this.apps.length === 0;
  }

  @action.bound
  setSearchText(value: string) {
    this.searchText = value;
  }

  @action.bound
  setFreeOnly(value: boolean) {
    this.freeOnly = value;
  }

  @action.bound
  setCategoryId(value: string) {
    this.categoryId = value;
  }

  @action.bound
  async loadCategories() {
    try {
      const loadedCategories = await getCategories();

      runInAction(() => {
        this.categories = loadedCategories;
      });
    } catch {
      runInAction(() => {
        this.loadError = "Не удалось загрузить категории";
      });
    }
  }

  @action.bound
  async loadApps(searchText = this.searchText) {
    const requestId = this.appsRequestId + 1;

    this.appsRequestId = requestId;
    this.isLoading = true;

    try {
      const loadedApps = await getApps({
        q: searchText.trim(),
        categoryId: this.categoryId,
        isFree: this.freeOnly ? true : undefined,
      });

      if (requestId !== this.appsRequestId) {
        return;
      }

      runInAction(() => {
        this.apps = loadedApps;
        this.loadError = "";
      });
    } catch {
      if (requestId !== this.appsRequestId) {
        return;
      }

      runInAction(() => {
        this.loadError = "Не удалось загрузить приложения";
      });
    } finally {
      if (requestId === this.appsRequestId) {
        runInAction(() => {
          this.isLoading = false;
        });
      }
    }
  }
}

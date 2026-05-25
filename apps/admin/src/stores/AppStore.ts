import { getMyApps, type EditorApp } from "@ministor/api";
import { action, makeObservable, observable, runInAction } from "mobx";

export class AppStore {
  @observable
  apps: Array<EditorApp> = [];
  @observable
  isLoading = false;
  @observable
  loadError = "";

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
}

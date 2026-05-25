import { AppStore } from "./AppStore";

export class RootStore {
  appStore = new AppStore();
}

export const rootStore = new RootStore();

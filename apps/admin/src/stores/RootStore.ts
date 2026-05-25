import { AppStore } from "./AppStore";
import { UserStore } from "./UserStore";

export class RootStore {
  userStore = new UserStore();
  appStore = new AppStore();
}

export const rootStore = new RootStore();

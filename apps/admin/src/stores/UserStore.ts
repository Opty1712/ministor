import { login as apiLogin, type LoginParams } from "@ministor/api";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

const TOKEN_STORAGE_KEY = "ministorAdminToken";

type UserInfo = {
  email: string;
};

export class UserStore {
  @observable
  token = localStorage.getItem(TOKEN_STORAGE_KEY) ?? "";
  @observable
  user: UserInfo | null = null;

  constructor() {
    makeObservable(this);
  }

  @computed
  get isLoggedIn() {
    return this.token !== "";
  }

  @action.bound
  async login(params: LoginParams) {
    const token = await apiLogin(params);

    localStorage.setItem(TOKEN_STORAGE_KEY, token);

    runInAction(() => {
      this.token = token;
      this.user = {
        email: params.email,
      };
    });
  }

  @action.bound
  logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.token = "";
    this.user = null;
  }
}

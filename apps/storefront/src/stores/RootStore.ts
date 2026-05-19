import { CatalogStore } from "./CatalogStore";

export class RootStore {
  catalogStore = new CatalogStore();
}

export const rootStore = new RootStore();

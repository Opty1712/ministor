export type CatalogApp = {
  id: string;
  cardTitle: string;
  price: number;
  isFree: boolean;
  description: string;
  categoryId: string | null;
  category: string;
  platforms: string;
  img: string;
};

export type CatalogCategory = {
  id: string;
  title: string;
};

export type ApiCategory = {
  id: string;
  title: string;
};

export type ApiMedia = {
  url?: string;
};

export type ApiApp = {
  id: string;
  title: string;
  description: string;
  categoryId: string | null;
  category?: ApiCategory | null;
  platforms?: Array<string>;
  price?: number;
  isFree?: boolean;
  cover?: ApiMedia | null;
};

export type AppsQueryParams = {
  q?: string;
  categoryId?: string;
  isFree?: boolean;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type EditorApp = {
  id: string;
  title: string;
  category: string;
  price: number;
  isFree: boolean;
};

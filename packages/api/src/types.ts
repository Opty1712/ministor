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

export type Category = {
  id: string;
  title: string;
};

export type AppImage = {
  url: string;
  storageKey: string;
  alt?: string;
  width: number;
  height: number;
  mimeType: string;
  size: number;
};

export type ApiApp = {
  id: string;
  title: string;
  slug?: string;
  description: string;
  categoryId: string | null;
  category?: Category | null;
  platforms?: Array<string>;
  price?: number;
  isFree?: boolean;
  cover?: AppImage | null;
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
  slug: string;
  description: string;
  categoryId: string;
  category?: Category | null;
  price: number;
  isFree?: boolean;
  cover?: AppImage | null;
};

export type EditorAppInput = {
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  price: number;
  cover?: AppImage | null;
};

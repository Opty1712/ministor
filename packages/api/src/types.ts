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

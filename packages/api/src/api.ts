import {
  ApiApp,
  AppsQueryParams,
  CatalogApp,
  CatalogCategory,
  CategoryListResponse,
  LoginParams,
} from "./types";

const API_BASE_URL = "https://ministor.ru";
const DEFAULT_APPS_LIMIT = 100;
const FALLBACK_COVER_URL = `${API_BASE_URL}/favicon.svg`;

export async function login({ email, password }: LoginParams): Promise<string> {
  const response = await fetch(new URL("/api/auth/login", API_BASE_URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Не удалось войти. Проверьте email и пароль.");
  }

  const data = await response.json();

  if (!data.token) {
    throw new Error("Сервер не вернул token.");
  }

  return data.token;
}

export async function getApps(
  params: AppsQueryParams = {},
): Promise<Array<CatalogApp>> {
  const url = new URL("/api/apps", API_BASE_URL);

  appendQueryParam(url, "q", params.q);
  appendQueryParam(url, "categoryId", params.categoryId);
  appendQueryParam(url, "isFree", params.isFree);
  appendQueryParam(url, "limit", DEFAULT_APPS_LIMIT);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Apps request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.success || !Array.isArray(data.items)) {
    throw new Error("Apps response has unexpected format");
  }

  return data.items.map(mapApiAppToCatalogApp);
}

export async function getCategories(): Promise<Array<CatalogCategory>> {
  const response = await fetch(new URL("/api/categories", API_BASE_URL));

  if (!response.ok) {
    throw new Error(`Categories request failed with status ${response.status}`);
  }

  const data = (await response.json()) as CategoryListResponse;

  if (!data.success || !Array.isArray(data.items)) {
    throw new Error("Categories response has unexpected format");
  }

  return data.items
    .map((category) => ({
      id: category.id,
      title: category.title,
    }))
    .sort((left, right) => left.title.localeCompare(right.title, "ru"));
}

function appendQueryParam(
  url: URL,
  name: string,
  value: string | number | boolean | undefined,
) {
  if (value === undefined || value === "") {
    return;
  }

  url.searchParams.set(name, String(value));
}

function mapApiAppToCatalogApp(app: ApiApp): CatalogApp {
  const price = app.price ?? 0;

  return {
    id: app.id,
    cardTitle: app.title,
    price,
    isFree: app.isFree ?? price <= 0,
    description: app.description,
    categoryId: app.categoryId,
    category: app.category?.title ?? "Без категории",
    platforms: formatPlatforms(app.platforms),
    img: getAbsoluteAssetUrl(app.cover?.url),
  };
}

function formatPlatforms(platforms: Array<string> | undefined): string {
  if (!platforms || platforms.length === 0) {
    return "Платформа не указана";
  }

  return platforms.join(" · ");
}

function getAbsoluteAssetUrl(url: string | undefined): string {
  if (!url) {
    return FALLBACK_COVER_URL;
  }

  return new URL(url, API_BASE_URL).toString();
}

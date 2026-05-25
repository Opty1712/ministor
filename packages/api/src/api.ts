import type {
  ApiApp,
  AppImage,
  AppsQueryParams,
  CatalogApp,
  Category,
  EditorApp,
  EditorAppInput,
  LoginParams,
} from "./types";

export const API_BASE_URL = "https://ministor.ru";
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

  const items: Array<ApiApp> = data.items;

  return items.map(mapApiAppToCatalogApp);
}

export async function getCategories(): Promise<Array<Category>> {
  const response = await fetch(new URL("/api/categories", API_BASE_URL));

  if (!response.ok) {
    throw new Error(`Categories request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.success || !Array.isArray(data.items)) {
    throw new Error("Categories response has unexpected format");
  }

  const items: Array<Category> = data.items;

  return items.sort((left, right) =>
    left.title.localeCompare(right.title, "ru"),
  );
}

export async function getMyApps(token: string): Promise<Array<EditorApp>> {
  const url = new URL("/api/me/apps", API_BASE_URL);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось загрузить приложения.");
  }

  const data = await response.json();

  if (!data.success || !Array.isArray(data.items)) {
    throw new Error("Ответ списка приложений имеет неожиданный формат.");
  }

  const items: Array<EditorApp> = data.items;

  return items;
}

export async function createMyApp(token: string, app: EditorAppInput) {
  await sendMyAppRequest(
    token,
    "/api/me/apps",
    "POST",
    app,
    "Не удалось создать приложение.",
  );
}

export async function updateMyApp(
  token: string,
  id: string,
  app: EditorAppInput,
) {
  await sendMyAppRequest(
    token,
    `/api/me/apps/${id}`,
    "PATCH",
    app,
    "Не удалось сохранить приложение.",
  );
}

export async function deleteMyApp(token: string, id: string) {
  await sendMyAppRequest(
    token,
    `/api/me/apps/${id}`,
    "DELETE",
    null,
    "Не удалось удалить приложение.",
  );
}

export async function uploadMyAppCover(
  token: string,
  slug: string,
  file: File,
): Promise<AppImage> {
  const formData = new FormData();

  formData.append("kind", "cover");
  formData.append("slug", slug);
  formData.append("assetFolder", slug);
  formData.append("file", file);

  const response = await fetch(
    new URL("/api/admin/uploads/images", API_BASE_URL),
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Не удалось загрузить изображения.");
  }

  const data = await response.json();

  if (!data.success || !Array.isArray(data.items)) {
    throw new Error("Ответ загрузки изображений имеет неожиданный формат.");
  }

  const [uploadedCover] = data.items;

  if (!uploadedCover) {
    throw new Error("Сервер не вернул обложку.");
  }

  return uploadedCover;
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

async function sendMyAppRequest(
  token: string,
  path: string,
  method: "POST" | "PATCH" | "DELETE",
  app: EditorAppInput | null,
  errorMessage: string,
) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (app) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(new URL(path, API_BASE_URL), {
    method,
    headers,
    body: app ? JSON.stringify(app) : undefined,
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }
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

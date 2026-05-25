import { getMyApps, type EditorApp } from "@ministor/api";
import { useEffect, useState } from "react";
import { Redirect, useLocation } from "wouter";
import { clearToken, getToken } from "../tokenStorage";

export function AppList() {
  const [, setLocation] = useLocation();
  const token = getToken();
  const [apps, setApps] = useState<Array<EditorApp>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadApps() {
      setIsLoading(true);
      setError("");

      if (!token) {
        return
      }

      try {
        const loadedApps = await getMyApps(token);
        setApps(loadedApps);
      } catch {
        setError("Не удалось загрузить приложения.");
      } finally {
        setIsLoading(false);
      }
    }

  useEffect(() => {
    loadApps();
  }, []);

  if (!token) {
    return <Redirect to="/" replace />;
  }

  function handleLogout() {
    clearToken();
    setLocation("/");
  }

  return (
    <main>
      <header>
        <h1>Приложения</h1>
        <p>Список ваших приложений.</p>
        <button type="button" onClick={handleLogout}>
          Выйти
        </button>
      </header>

      {isLoading && <p>Загрузка приложений...</p>}

      {!isLoading && error && <p role="alert">{error}</p>}

      {!isLoading && !error && apps.length === 0 && (
        <p>У вас пока нет приложений.</p>
      )}

      {!isLoading && !error && apps.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
            </tr>
          </thead>

          <tbody>
            {apps.map((app) => (
              <tr key={app.id}>
                <td>
                  <strong>{app.title}</strong>
                </td>
                <td>{app.category}</td>
                <td>{formatPrice(app)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

function formatPrice(app: EditorApp) {
  if (app.isFree || app.price <= 0) {
    return "Бесплатно";
  }

  return `${app.price} ₽`;
}

import type { EditorApp } from "@ministor/api";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, Redirect, useLocation } from "wouter";
import { useStore } from "../stores/useStore";
import { clearToken, getToken } from "../tokenStorage";

export const AppList = observer(function AppList() {
  const { appStore } = useStore();
  const [, setLocation] = useLocation();
  const token = getToken();

  useEffect(() => {
    if (token) {
      appStore.loadApps(token);
    }
  }, [appStore, token]);

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
        <Link href="/admin/create">Создать приложение</Link>
        <button type="button" onClick={handleLogout}>
          Выйти
        </button>
      </header>

      {appStore.isLoading && <p>Загрузка приложений...</p>}

      {!appStore.isLoading && appStore.loadError && (
        <p role="alert">{appStore.loadError}</p>
      )}

      {!appStore.isLoading &&
        !appStore.loadError &&
        appStore.apps.length === 0 && <p>У вас пока нет приложений.</p>}

      {!appStore.isLoading &&
        !appStore.loadError &&
        appStore.apps.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Категория</th>
                <th>Цена</th>
              </tr>
            </thead>

            <tbody>
              {appStore.apps.map((app) => (
                <tr key={app.id}>
                  <td>
                    <Link href={`/admin/edit/${app.id}`}>{app.title}</Link>
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
});

function formatPrice(app: EditorApp) {
  if (app.isFree || app.price <= 0) {
    return "Бесплатно";
  }

  return `${app.price} ₽`;
}

import { deleteMyApp, updateMyApp, type EditorAppInput } from "@ministor/api";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Redirect, useLocation, useParams } from "wouter";
import { AppForm } from "../components/AppForm";
import { useStore } from "../stores/useStore";
import { getToken } from "../tokenStorage";

export const AppEdit = observer(function AppEdit() {
  const { appStore } = useStore();
  const [, setLocation] = useLocation();
  const token = getToken();
  const { id } = useParams<{ id: string }>();
  const app = appStore.apps.find((item) => item.id === id);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (!token || appStore.apps.length > 0) {
      return;
    }

    appStore.loadApps(token);
  }, [appStore, appStore.apps.length, token]);

  if (!token) {
    return <Redirect to="/" replace />;
  }

  const authToken = token;

  async function handleSubmit(value: EditorAppInput) {
    await updateMyApp(authToken, id, value);
    setLocation("/admin");
  }

  async function handleDelete() {
    setDeleteError("");

    try {
      await deleteMyApp(authToken, id);
      setLocation("/admin");
    } catch {
      setDeleteError("Не удалось удалить приложение.");
    }
  }

  return (
    <main>
      <h1>Редактировать приложение</h1>
      {appStore.isLoading && <p>Загрузка приложения...</p>}
      {!appStore.isLoading && appStore.loadError && (
        <p role="alert">{appStore.loadError}</p>
      )}
      {!appStore.isLoading && !appStore.loadError && !app && (
        <p>Приложение не найдено в списке.</p>
      )}
      {!appStore.isLoading && !appStore.loadError && app && (
        <AppForm
          initialValue={app}
          submitText="Сохранить"
          onSubmit={handleSubmit}
        />
      )}
      {!appStore.isLoading && !appStore.loadError && app && (
        <button type="button" onClick={handleDelete}>
          Удалить приложение
        </button>
      )}
      {deleteError && <p role="alert">{deleteError}</p>}
    </main>
  );
});

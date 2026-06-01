import { deleteMyApp, updateMyApp, type EditorAppInput } from "@ministor/api";
import { Button, Group, Header, Panel, Text } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Redirect, useLocation, useParams } from "wouter";
import { AppForm } from "../components/AppForm";
import { useStore } from "../stores/useStore";

export const AppEdit = observer(function AppEdit() {
  const { appStore, userStore } = useStore();
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const app = appStore.apps.find((item) => item.id === id);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (!userStore.token || appStore.apps.length > 0) {
      return;
    }

    appStore.loadApps(userStore.token);
  }, [appStore, appStore.apps.length, userStore.token]);

  if (!userStore.isLoggedIn) {
    return <Redirect to="/" replace />;
  }

  async function handleSubmit(value: EditorAppInput) {
    if (!userStore.token) {
      return;
    }

    await updateMyApp(userStore.token, id, value);
    setLocation("/admin");
  }

  async function handleDelete() {
    if (!userStore.token) {
      return;
    }

    setDeleteError("");

    try {
      await deleteMyApp(userStore.token, id);
      setLocation("/admin");
    } catch {
      setDeleteError("Не удалось удалить приложение.");
    }
  }

  return (
    <Panel nav="edit">
      <Group header={<Header>Редактировать приложение</Header>}>
        {appStore.isLoading && <Text>Загрузка приложения...</Text>}
        {!appStore.isLoading && appStore.loadError && (
          <Text Component="p" role="alert">
            {appStore.loadError}
          </Text>
        )}
        {!appStore.isLoading && !appStore.loadError && !app && (
          <Text>Приложение не найдено в списке.</Text>
        )}
        {!appStore.isLoading && !appStore.loadError && app && (
          <AppForm
            token={userStore.token}
            initialValue={app}
            submitText="Сохранить"
            onSubmit={handleSubmit}
          />
        )}
        {!appStore.isLoading && !appStore.loadError && app && (
          <Button type="button" mode="secondary" onClick={handleDelete}>
            Удалить приложение
          </Button>
        )}
        {deleteError && (
          <Text Component="p" role="alert">
            {deleteError}
          </Text>
        )}
      </Group>
    </Panel>
  );
});

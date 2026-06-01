import type { EditorApp } from "@ministor/api";
import {
  Button,
  ButtonGroup,
  Group,
  Header,
  Link,
  Panel,
  SimpleCell,
  Text,
} from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Redirect, Link as RouterLink, useLocation } from "wouter";
import { useStore } from "../stores/useStore";

export const AppList = observer(function AppList() {
  const { appStore, userStore } = useStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (userStore.token) {
      appStore.loadApps(userStore.token);
    }
  }, [appStore, userStore.token]);

  if (!userStore.isLoggedIn) {
    return <Redirect to="/" replace />;
  }

  function handleLogout() {
    userStore.logout();
    setLocation("/");
  }

  return (
    <Panel nav="apps">
      <Group header={<Header>Приложения</Header>}>
        <ButtonGroup mode="horizontal" gap="s">
          <Button
            type="button"
            size="m"
            onClick={() => setLocation("/admin/create")}
          >
            Создать приложение
          </Button>
          <Button
            type="button"
            size="m"
            mode="secondary"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </ButtonGroup>

        {appStore.isLoading && <Text>Загрузка приложений...</Text>}

        {!appStore.isLoading && appStore.loadError && (
          <Text Component="p" role="alert">
            {appStore.loadError}
          </Text>
        )}

        {!appStore.isLoading &&
          !appStore.loadError &&
          appStore.apps.length === 0 && <Text>У вас пока нет приложений.</Text>}

        {!appStore.isLoading &&
          !appStore.loadError &&
          appStore.apps.length > 0 && (
            <>
              {appStore.apps.map((app) => (
                <SimpleCell
                  key={app.id}
                  subtitle={app.category?.title ?? "Без категории"}
                  indicator={formatPrice(app)}
                >
                  <RouterLink href={`/admin/edit/${app.id}`} asChild>
                    <Link>{app.title}</Link>
                  </RouterLink>
                </SimpleCell>
              ))}
            </>
          )}
      </Group>
    </Panel>
  );
});

function formatPrice(app: EditorApp) {
  if (app.isFree || app.price <= 0) {
    return "Бесплатно";
  }

  return `${app.price} ₽`;
}

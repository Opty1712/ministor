import { Group, Header, Panel } from "@vkontakte/vkui";
import { createMyApp, type EditorAppInput } from "@ministor/api";
import { observer } from "mobx-react-lite";
import { Redirect, useLocation } from "wouter";
import { AppForm } from "../components/AppForm";
import { useStore } from "../stores/useStore";

const EMPTY_APP: EditorAppInput = {
  title: "",
  slug: "",
  description: "",
  categoryId: "",
  price: 0,
};

export const AppCreate = observer(function AppCreate() {
  const { userStore } = useStore();
  const [, setLocation] = useLocation();

  if (!userStore.isLoggedIn) {
    return <Redirect to="/" replace />;
  }

  async function handleSubmit(value: EditorAppInput) {
    await createMyApp(userStore.token, value);
    setLocation("/admin");
  }

  return (
    <Panel nav="create">
      <Group header={<Header>Создать приложение</Header>}>
        <AppForm
          token={userStore.token}
          initialValue={EMPTY_APP}
          submitText="Создать"
          onSubmit={handleSubmit}
        />
      </Group>
    </Panel>
  );
});

import { createMyApp, type EditorAppInput } from "@ministor/api";
import { Redirect, useLocation } from "wouter";
import { AppForm } from "../components/AppForm";
import { getToken } from "../tokenStorage";

const EMPTY_APP: EditorAppInput = {
  title: "",
  slug: "",
  description: "",
  categoryId: "",
  price: 0,
};

export function AppCreate() {
  const [, setLocation] = useLocation();
  const token = getToken();

  if (!token) {
    return <Redirect to="/" replace />;
  }

  const authToken = token;

  async function handleSubmit(value: EditorAppInput) {
    await createMyApp(authToken, value);
    setLocation("/admin");
  }

  return (
    <main>
      <h1>Создать приложение</h1>
      <AppForm
        initialValue={EMPTY_APP}
        submitText="Создать"
        onSubmit={handleSubmit}
      />
    </main>
  );
}

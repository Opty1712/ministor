import { Link, Redirect } from "wouter";
import { getToken } from "../tokenStorage";

export function AppCreate() {
  const token = getToken();

  if (!token) {
    return <Redirect to="/" replace />;
  }

  return (
    <main>
      <h1>Создать приложение</h1>
      <p>Форма создания появится на следующем шаге.</p>
      <Link href="/admin">К списку приложений</Link>
    </main>
  );
}

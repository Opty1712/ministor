import { Link, Redirect, useParams } from "wouter";
import { getToken } from "../tokenStorage";

export function AppEdit() {
  const token = getToken();
  const { id } = useParams<{ id: string }>();

  if (!token) {
    return <Redirect to="/" replace />;
  }

  return (
    <main>
      <h1>Редактировать приложение</h1>
      <p>Идентификатор приложения: {id}</p>
      <p>Форма редактирования появится на следующем шаге.</p>
      <Link href="/admin">К списку приложений</Link>
    </main>
  );
}

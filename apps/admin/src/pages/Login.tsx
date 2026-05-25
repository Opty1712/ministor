import {
  Button,
  FormItem,
  Group,
  Header,
  Input,
  Panel,
  Text,
} from "@vkontakte/vkui";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { useLocation } from "wouter";
import { useStore } from "../stores/useStore";

type LoginForm = {
  email: string;
  password: string;
};

export function Login() {
  const { userStore } = useStore();
  const [, setLocation] = useLocation();
  const [error, setError] = useState("");

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  function handleFieldChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await userStore.login(form);
      setLocation("/admin");
    } catch {
      setError("Не удалось войти. Попробуйте еще раз.");
    }
  }

  return (
    <Panel nav="login">
      <Group header={<Header>Вход в админку</Header>}>
        <form onSubmit={handleSubmit}>
          <FormItem top="Email">
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleFieldChange}
              required
            />
          </FormItem>

          <FormItem top="Пароль">
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleFieldChange}
              required
            />
          </FormItem>

          <FormItem>
            <Button type="submit">Войти</Button>
          </FormItem>
        </form>

        {error && (
          <FormItem>
            <Text Component="p" role="alert">
              {error}
            </Text>
          </FormItem>
        )}
      </Group>
    </Panel>
  );
}

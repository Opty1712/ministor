import { AppFields } from "@ministor/api";
import { observer } from "mobx-react-lite";
import { ChangeEvent, SubmitEventHandler, useEffect, useState } from "react";
import { CreateAppArgs } from "../../../../packages/api/src";
import { useStore } from "../stores/useStore";

type AppFormProps = {
  onSubmit: (value: CreateAppArgs) => Promise<void>;
};

export const AppForm = observer(({ onSubmit }: AppFormProps) => {
  const { userStore, appStore } = useStore();
  const [error, setError] = useState("");

  const [form, setForm] = useState<AppFields>({
    categoryId: "",
    description: "",
    price: 0,
    slug: "",
    title: "",
  });

  useEffect(() => {
    appStore.loadCategories();
  }, []);

  function handleFieldChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault();
    setError("");

    if (!userStore.token) {
      return;
    }
    await onSubmit({ body: form, token: userStore.token });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Название:{" "}
        <input type="text" name="title" onChange={handleFieldChange} />
      </div>
      <div>
        Slug: <input type="text" name="slug" onChange={handleFieldChange} />
      </div>
      <div>
        Описание:{" "}
        <input type="text" name="description" onChange={handleFieldChange} />
      </div>
      <div>
        Категория:{" "}
        <select name="categoryId" onChange={handleFieldChange}>
          {appStore.categories.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </div>
      <div>
        Цена: <input type="number" name="price" onChange={handleFieldChange} />
      </div>
      <button type="submit">Отправить</button>

      {error}
    </form>
  );
});

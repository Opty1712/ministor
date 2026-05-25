import type { EditorAppInput } from "@ministor/api";
import { observer } from "mobx-react-lite";
import { ChangeEvent, SubmitEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import { useStore } from "../stores/useStore";

type AppFormProps = {
  initialValue: EditorAppInput;
  submitText: string;
  onSubmit: (value: EditorAppInput) => Promise<void>;
};

export const AppForm = observer(function AppForm({
  initialValue,
  submitText,
  onSubmit,
}: AppFormProps) {
  const { appStore } = useStore();
  const [form, setForm] = useState({
    ...initialValue,
    price: String(initialValue.price),
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (appStore.categories.length > 0) {
      return;
    }

    void appStore.loadCategories();
  }, [appStore, appStore.categories.length]);

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

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await onSubmit({
        ...form,
        price: Number(form.price) || 0,
      });
    } catch {
      setError("Не удалось сохранить приложение.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>
          Название
          <input
            name="title"
            value={form.title}
            onChange={handleFieldChange}
            required
          />
        </label>
      </p>

      <p>
        <label>
          Slug
          <input
            name="slug"
            value={form.slug}
            onChange={handleFieldChange}
            required
          />
        </label>
      </p>

      <p>
        <label>
          Описание
          <textarea
            name="description"
            value={form.description}
            onChange={handleFieldChange}
            required
          />
        </label>
      </p>

      <p>
        <label>
          Категория
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleFieldChange}
            required
          >
            <option value="">Выберите категорию</option>
            {appStore.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
      </p>

      <p>
        <label>
          Цена
          <input
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={handleFieldChange}
            required
          />
        </label>
      </p>

      {appStore.categoriesLoadError && (
        <p role="alert">{appStore.categoriesLoadError}</p>
      )}

      {error && <p role="alert">{error}</p>}

      <button type="submit">{submitText}</button>
      <Link href="/admin">К списку приложений</Link>
    </form>
  );
});

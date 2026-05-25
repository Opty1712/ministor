import {
  API_BASE_URL,
  uploadMyAppCover,
  type EditorAppInput
} from "@ministor/api";
import { observer } from "mobx-react-lite";
import { ChangeEvent, SubmitEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import { useStore } from "../stores/useStore";

type AppFormProps = {
  token: string;
  initialValue: EditorAppInput;
  submitText: string;
  onSubmit: (value: EditorAppInput) => Promise<void>;
};

export const AppForm = observer(function AppForm({
  token,
  initialValue,
  submitText,
  onSubmit,
}: AppFormProps) {
  const { appStore } = useStore();
  const [form, setForm] = useState<EditorAppInput>(initialValue);
  const [coverFile, setCoverFile] = useState<File | null>(null);
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

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    setCoverFile(event.target.files?.[0] ?? null);
  }

  function handleRemoveCover() {
    setForm({
      ...form,
      cover: null,
    });
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const slug = form.slug.trim();

    if (coverFile && !slug) {
      setError("Чтобы загрузить обложку, укажите slug.");
      return;
    }

    try {
      const cover = coverFile
        ? await uploadMyAppCover(token, slug, coverFile)
        : form.cover;

      await onSubmit({
        ...form,
        slug,
        price: Number(form.price) || 0,
        cover,
      });
    } catch {
      setError("Не удалось загрузить обложку или сохранить приложение.");
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

      <p>
        <label>
          Обложка
          <input type="file" accept="image/*" onChange={handleCoverChange} />
        </label>
      </p>

      {form.cover && (
        <figure>
          <img
            src={getImageSrc(form.cover.url)}
            alt={form.cover.alt ?? "Обложка приложения"}
            width="240"
          />
          <figcaption>{form.cover.url}</figcaption>
          <button type="button" onClick={handleRemoveCover}>
            Удалить обложку
          </button>
        </figure>
      )}

      {coverFile && <p>Будет загружена обложка: {coverFile.name}</p>}

      {appStore.categoriesLoadError && (
        <p role="alert">{appStore.categoriesLoadError}</p>
      )}

      {error && <p role="alert">{error}</p>}

      <button type="submit">{submitText}</button>
      <Link href="/admin">К списку приложений</Link>
    </form>
  );
});

function getImageSrc(url: string) {
  return new URL(url, API_BASE_URL).toString();
}

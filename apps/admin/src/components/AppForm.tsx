import {
  API_BASE_URL,
  uploadMyAppCover,
  type EditorAppInput,
} from "@ministor/api";
import {
  Button,
  ButtonGroup,
  Caption,
  File,
  FormItem,
  Input,
  Link,
  NativeSelect,
  Text,
  Textarea,
} from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import { ChangeEvent, SubmitEvent, useEffect, useState } from "react";
import { Link as RouterLink } from "wouter";
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
      <RouterLink href="/admin" asChild>
        <Link>← К списку приложений</Link>
      </RouterLink>

      <FormItem top="Название">
        <Input
          name="title"
          value={form.title}
          onChange={handleFieldChange}
          required
        />
      </FormItem>

      <FormItem top="Slug">
        <Input
          name="slug"
          value={form.slug}
          onChange={handleFieldChange}
          required
        />
      </FormItem>

      <FormItem top="Описание">
        <Textarea
          name="description"
          value={form.description}
          onChange={handleFieldChange}
          required
        />
      </FormItem>

      <FormItem top="Категория">
        <NativeSelect
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
        </NativeSelect>
      </FormItem>

      <FormItem top="Цена">
        <Input
          name="price"
          type="number"
          min="0"
          value={form.price}
          onChange={handleFieldChange}
          required
        />
      </FormItem>

      <FormItem top="Обложка">
        <File accept="image/*" onChange={handleCoverChange}>
          Выбрать обложку
        </File>
      </FormItem>

      {form.cover && (
        <figure>
          <img
            src={getImageSrc(form.cover.url)}
            alt={form.cover.alt ?? "Обложка приложения"}
            width="240"
          />
          <figcaption>
            <Caption>{form.cover.url}</Caption>
          </figcaption>
          <Button type="button" mode="secondary" onClick={handleRemoveCover}>
            Удалить обложку
          </Button>
        </figure>
      )}

      {coverFile && (
        <FormItem>
          <Text>Будет загружена обложка: {coverFile.name}</Text>
        </FormItem>
      )}

      {appStore.categoriesLoadError && (
        <FormItem>
          <Text Component="p" role="alert">
            {appStore.categoriesLoadError}
          </Text>
        </FormItem>
      )}

      {error && (
        <FormItem>
          <Text Component="p" role="alert">
            {error}
          </Text>
        </FormItem>
      )}

      <FormItem>
        <ButtonGroup mode="horizontal" gap="s">
          <Button type="submit">{submitText}</Button>
        </ButtonGroup>
      </FormItem>
    </form>
  );
});

function getImageSrc(url: string) {
  return new URL(url, API_BASE_URL).toString();
}

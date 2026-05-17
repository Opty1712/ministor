import { useEffect, useState } from "react";
import { getApps, getCategories } from "./api/apps";
import styles from "./App.module.css";
import { AppCard } from "./components/AppCard/AppCard";
import { Filter } from "./components/Filter/Filter";
import type { CatalogApp, CatalogCategory } from "./types/app";

const SEARCH_DEBOUNCE_MS = 350;

export default function App() {
  const [apps, setApps] = useState<Array<CatalogApp>>([]);
  const [categories, setCategories] = useState<Array<CatalogCategory>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebouncedValue(searchText, SEARCH_DEBOUNCE_MS);
  const [freeOnly, setFreeOnly] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const loadedCategories = await getCategories();
        setCategories(loadedCategories);
      } catch {
        setLoadError("Не удалось загрузить категории");
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadApps() {
      setIsLoading(true);

      try {
        const loadedApps = await getApps({
          q: debouncedSearchText.trim(),
          categoryId,
          isFree: freeOnly ? true : undefined,
        });

        setApps(loadedApps);
        setLoadError("");
      } catch {
        setLoadError("Не удалось загрузить приложения");
      } finally {
        setIsLoading(false);
      }
    }

    loadApps();
  }, [categoryId, debouncedSearchText, freeOnly]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>MiniStore</h1>
      </header>

      <Filter
        searchText={searchText}
        freeOnly={freeOnly}
        categoryId={categoryId}
        categories={categories}
        onSearchTextChange={setSearchText}
        onFreeOnlyChange={setFreeOnly}
        onCategoryChange={setCategoryId}
      />

      <main className={styles.catalog}>
        {apps.map((props) => (
          <AppCard {...props} key={props.id} />
        ))}
      </main>

      {isLoading && <p className={styles.state}>Загрузка приложений...</p>}

      {!isLoading && loadError && <p className={styles.error}>{loadError}</p>}

      {!isLoading && !loadError && apps.length === 0 && (
        <p className={styles.empty}>Приложения не найдены</p>
      )}
    </div>
  );
}

function useDebouncedValue(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, value]);

  return debouncedValue;
}

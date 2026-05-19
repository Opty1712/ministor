import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./App.module.css";
import { AppCard } from "./components/AppCard/AppCard";
import { Filter } from "./components/Filter/Filter";
import { useStore } from "./stores/useStore";

const SEARCH_DEBOUNCE_MS = 350;

function App() {
  const { catalogStore } = useStore();
  const debouncedSearchText = useDebouncedValue(
    catalogStore.searchText,
    SEARCH_DEBOUNCE_MS,
  );

  useEffect(() => {
    void catalogStore.loadCategories();
  }, [catalogStore]);

  useEffect(() => {
    void catalogStore.loadApps(debouncedSearchText);
  }, [
    catalogStore,
    catalogStore.categoryId,
    debouncedSearchText,
    catalogStore.freeOnly,
  ]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>MiniStore</h1>
      </header>

      <Filter
        searchText={catalogStore.searchText}
        freeOnly={catalogStore.freeOnly}
        categoryId={catalogStore.categoryId}
        categories={catalogStore.categories}
        onSearchTextChange={catalogStore.setSearchText}
        onFreeOnlyChange={catalogStore.setFreeOnly}
        onCategoryChange={catalogStore.setCategoryId}
      />

      <main className={styles.catalog}>
        {catalogStore.apps.map((props) => (
          <AppCard {...props} key={props.id} />
        ))}
      </main>

      {catalogStore.isLoading && (
        <p className={styles.state}>Загрузка приложений...</p>
      )}

      {!catalogStore.isLoading && catalogStore.loadError && (
        <p className={styles.error}>{catalogStore.loadError}</p>
      )}

      {!catalogStore.isLoading &&
        !catalogStore.loadError &&
        catalogStore.isEmpty && (
          <p className={styles.empty}>Приложения не найдены</p>
        )}
    </div>
  );
}

export default observer(App);

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

import { getApps } from "@ministor/api";
import { useState } from "react";
import styles from "./App.module.css";
import { AppCard } from "./components/AppCard/AppCard";
import { Filter } from "./components/Filter/Filter";
import { apps } from "./data/apps";

const categories = [...new Set(apps.map((app) => app.category))];

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const [category, setCategory] = useState("");

  const filteredApps = apps.filter((app) => {
    const text = searchText.trim().toLowerCase();
    const matchesText =
      app.cardTitle.toLowerCase().includes(text) ||
      app.description.toLowerCase().includes(text);
    const matchesFree = !freeOnly || app.isFree;
    const matchesCategory = category === "" || app.category === category;

    return matchesText && matchesFree && matchesCategory;
  });

  getApps();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>MiniStore</h1>
      </header>

      <Filter
        searchText={searchText}
        freeOnly={freeOnly}
        category={category}
        categories={categories}
        onSearchTextChange={setSearchText}
        onFreeOnlyChange={setFreeOnly}
        onCategoryChange={setCategory}
      />

      <main className={styles.catalog}>
        {filteredApps.map((props) => (
          <AppCard {...props} key={props.cardTitle} />
        ))}
      </main>

      {filteredApps.length === 0 && (
        <p className={styles.empty}>Приложения не найдены</p>
      )}
    </div>
  );
}

import { Category } from "@ministor/api";
import styles from "./Filter.module.css";

type FilterProps = {
  searchText: string;
  freeOnly: boolean;
  categoryId: string;
  categories: Array<Category>;
  onSearchTextChange: (value: string) => void;
  onFreeOnlyChange: (value: boolean) => void;
  onCategoryChange: (value: string) => void;
};

export function Filter({
  searchText,
  freeOnly,
  categoryId,
  categories,
  onSearchTextChange,
  onFreeOnlyChange,
  onCategoryChange,
}: FilterProps) {
  return (
    <section className={styles.filter}>
      <input
        className={styles.search}
        type="text"
        placeholder="Поиск по названию или описанию"
        value={searchText}
        onChange={(event) => onSearchTextChange(event.target.value)}
      />

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={freeOnly}
          onChange={(event) => onFreeOnlyChange(event.target.checked)}
        />
        Бесплатные
      </label>

      <select
        className={styles.select}
        value={categoryId}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">Все категории</option>
        {categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.title}
          </option>
        ))}
      </select>
    </section>
  );
}

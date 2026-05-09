import styles from "./Filter.module.css";

export function Filter({
  searchText,
  freeOnly,
  category,
  categories,
  onSearchTextChange,
  onFreeOnlyChange,
  onCategoryChange,
}) {
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
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">Все категории</option>
        {categories.map((categoryName) => (
          <option value={categoryName} key={categoryName}>
            {categoryName}
          </option>
        ))}
      </select>
    </section>
  );
}

import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <h1 className={styles.header}>MiniStore</h1>

      <main>
        <section className={styles.section}>
          <h2>Товар 1</h2>
          <p>Описание</p>
          <span>24/09</span>
        </section>

        <section className={styles.section}>
          <h2>Товар 2</h2>
          <p>Описание</p>
          <span>25/09</span>
        </section>

        <section className={styles.section}>
          <h2>Товар 3</h2>
          <p>Описание</p>
          <span>04/09</span>
        </section>
      </main>
    </>
  );
}

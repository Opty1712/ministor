import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>MiniStore</h1>
      </header>

      <main className={styles.catalog}>
        <article className={styles.card}>
          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src="https://ministor.ru/assets/atlas-notes/cover.jpg"
              alt="Атлас заметок"
            />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Атлас заметок</h2>
              <span className={styles.price}>Бесплатно</span>
            </div>

            <p className={styles.description}>
              Атлас заметок показывает учебный интерфейс для категории
              «Продуктивность» и подходит для каталога, поиска, карточек и
              фильтров.
            </p>

            <div className={styles.cardFooter}>
              <span>Продуктивность</span>
              <span>web · desktop</span>
            </div>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src="https://ministor.ru/assets/budget-lens/cover.jpg"
              alt="Бюджетная линза"
            />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Бюджетная линза</h2>
              <span className={styles.price}>Бесплатно</span>
            </div>

            <p className={styles.description}>
              Бюджетная линза показывает учебный интерфейс для категории
              «Финансы» и подходит для каталога, поиска, карточек и фильтров.
            </p>

            <div className={styles.cardFooter}>
              <span>Финансы</span>
              <span>web · android</span>
            </div>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src="https://ministor.ru/assets/habit-harbor/cover.jpg"
              alt="Гавань привычек"
            />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Гавань привычек</h2>
              <span className={styles.price}>Бесплатно</span>
            </div>

            <p className={styles.description}>
              Гавань привычек показывает учебный интерфейс для категории
              «Здоровье» и подходит для каталога, поиска, карточек и фильтров.
            </p>

            <div className={styles.cardFooter}>
              <span>Здоровье</span>
              <span>web · android</span>
            </div>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src="https://ministor.ru/assets/sales-harbor/cover.jpg"
              alt="Гавань продаж"
            />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Гавань продаж</h2>
              <span className={styles.price}>Бесплатно</span>
            </div>

            <p className={styles.description}>
              Гавань продаж показывает учебный интерфейс для категории «Финансы»
              и подходит для каталога, поиска, карточек и фильтров.
            </p>

            <div className={styles.cardFooter}>
              <span>Финансы</span>
              <span>web · desktop</span>
            </div>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src="https://ministor.ru/assets/quiz-harbor/cover.jpg"
              alt="Гавань тестов"
            />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Гавань тестов</h2>
              <span className={styles.price}>Бесплатно</span>
            </div>

            <p className={styles.description}>
              Гавань тестов показывает учебный интерфейс для категории
              «Обучение» и подходит для каталога, поиска, карточек и фильтров.
            </p>

            <div className={styles.cardFooter}>
              <span>Обучение</span>
              <span>web</span>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

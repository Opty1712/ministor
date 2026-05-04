import styles from "./App.module.css";
import { AppCard } from "./components/AppCard/AppCard";
import { apps } from "./data/apps";

export default function App() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>MiniStore</h1>
      </header>

      <main className={styles.catalog}>
        {apps.map((props) => (
          <AppCard {...props} key={props.cardTitle} />
        ))}
      </main>
    </div>
  );
}

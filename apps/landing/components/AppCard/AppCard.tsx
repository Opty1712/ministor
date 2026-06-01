import styles from "./AppCard.module.css";

export type AppCardProps = {
  cardTitle: string;
  price: number;
  isFree: boolean;
  description: string;
  category: string;
  platforms: string;
  img: string;
};

export function AppCard({
  cardTitle,
  price,
  isFree,
  description,
  category,
  platforms,
  img,
}: AppCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={img} alt={cardTitle} />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>{cardTitle}</h2>
          <span className={styles.price}>
            {isFree ? "Бесплатно" : `${price} ₽`}
          </span>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.cardFooter}>
          <span>{category}</span>
          <span>{platforms}</span>
        </div>
      </div>
    </article>
  );
}

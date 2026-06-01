type AppCardProps = {
  cardTitle: string;
  price: number;
  isFree: boolean;
  description: string;
  category: string;
  platforms: string;
  img: string;
};

export const apps: Array<AppCardProps> = [
  {
    cardTitle: "Атлас заметок",
    price: 0,
    isFree: true,
    description:
      "Атлас заметок показывает учебный интерфейс для категории «Продуктивность» и подходит для каталога, поиска, карточек и фильтров.",
    category: "Продуктивность",
    platforms: "web · desktop",
    img: "https://ministor.ru/assets/atlas-notes/cover.jpg",
  },
  {
    cardTitle: "Бюджетная линза",
    price: 199,
    isFree: false,
    description:
      "Бюджетная линза показывает учебный интерфейс для категории «Финансы» и подходит для каталога, поиска, карточек и фильтров.",
    category: "Финансы",
    platforms: "web · android",
    img: "https://ministor.ru/assets/budget-lens/cover.jpg",
  },
  {
    cardTitle: "Гавань привычек",
    price: 0,
    isFree: true,
    description:
      "Гавань привычек показывает учебный интерфейс для категории «Здоровье» и подходит для каталога, поиска, карточек и фильтров.",
    category: "Здоровье",
    platforms: "web · android",
    img: "https://ministor.ru/assets/habit-harbor/cover.jpg",
  },
  {
    cardTitle: "Гавань продаж",
    price: 349,
    isFree: false,
    description:
      "Гавань продаж показывает учебный интерфейс для категории «Финансы» и подходит для каталога, поиска, карточек и фильтров.",
    category: "Финансы",
    platforms: "web · desktop",
    img: "https://ministor.ru/assets/sales-harbor/cover.jpg",
  },
  {
    cardTitle: "Гавань тестов",
    price: 149,
    isFree: false,
    description:
      "Гавань тестов показывает учебный интерфейс для категории «Обучение» и подходит для каталога, поиска, карточек и фильтров.",
    category: "Обучение",
    platforms: "web",
    img: "https://ministor.ru/assets/quiz-harbor/cover.jpg",
  },
];

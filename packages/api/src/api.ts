import type { AppCard } from "./types";

export const getApps = async (): Promise<AppCard[]> =>
  fetch("https://mail.ru").then(() => [
    {
      cardTitle: "",
      category: "",
      description: "",
      img: "",
      isFree: true,
      platforms: "",
      price: 0,
    },
  ]);

import Link from "next/link";
import { Fragment } from "react";
import "./globals.css";
import styles from "./page.module.css";

const links = [
  { href: "/", text: "Главная" },
  { href: "/admin", text: "Админка" },
  { href: "/storefront", text: "Витрина" },
  { href: "/landing", text: "Лэндинг" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <nav className={styles.nav}>
          {links.map(({ href, text }, index) => (
            <Fragment key={href}>
              <Link href={href}>{text}</Link>{" "}
              {index !== links.length - 1 && " | "}
            </Fragment>
          ))}
        </nav>
        <main>{children}</main>
        <footer className={styles.footer}>Автор: Вася Иванов</footer>
      </body>
    </html>
  );
}

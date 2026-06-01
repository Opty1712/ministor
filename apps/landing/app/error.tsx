"use client";
import Link from "next/link";

function ErrorPage() {
  return (
    <div>
      Внутренняя ошибка сервера <Link href="/">Перейдите на Главную</Link>
    </div>
  );
}

export default ErrorPage;

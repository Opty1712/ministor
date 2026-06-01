"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { replace, push } = useRouter();
  return (
    <div>
      404. <Link href="/">Перейдите на Главную</Link>
      <button onClick={() => replace("/")}>или так - replace</button>
      <button onClick={() => push("/")}>или так - push</button>
    </div>
  );
}

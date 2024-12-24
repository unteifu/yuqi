import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-5 mt-20 flex flex-1 flex-col items-center gap-8 text-center">
      <Image
        src="/yuqi.webp"
        alt="YuqiJS"
        width={400}
        height={100}
        priority
        unoptimized
      />
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-pink-400 sm:text-4xl">
          REST API's made magical 🪄
        </h1>
        <p className="max-w-lg text-sm text-slate-400 dark:text-slate-300 sm:text-lg">
          Build Typesafe End-to-End REST API's with ease, reduce mistakes and
          increase productivity.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">
        <Link href="/docs" className="flex rounded-full bg-pink-400 px-8 py-3">
          <span className="font-medium text-white">Get Started</span>
        </Link>
        <Link href="/" className="flex rounded-full bg-pink-200/50 px-8 py-3">
          <span className="font-medium text-pink-500">Playground</span>
        </Link>
      </div>
    </main>
  );
}

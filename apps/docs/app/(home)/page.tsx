import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 gap-8 flex-col mt-20 mx-5 items-center text-center">
      <Image
        src="/yuqi.webp"
        alt="YuqiJS"
        width={400}
        height={100}
        priority
        unoptimized
      />
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl sm:text-4xl font-bold text-pink-400">
          REST API's made magical 🪄
        </h1>
        <p className="text-sm sm:text-lg text-slate-400 max-w-lg dark:text-slate-300">
          Build Typesafe End-to-End REST API's with ease, reduce mistakes and
          increase productivity.
        </p>
      </div>
      <div className=" flex gap-3 sm:gap-10 flex-col sm:flex-row">
        <Link href="/" className="bg-pink-400 px-8 py-3 flex rounded-full">
          <span className="font-medium text-white">Get Started</span>
        </Link>
        <Link href="/" className="bg-pink-200/50 px-8 py-3 flex rounded-full">
          <span className="font-medium text-pink-500">Playground</span>
        </Link>
      </div>
    </main>
  );
}

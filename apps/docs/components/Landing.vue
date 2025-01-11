<script setup lang="ts"></script>

<template>
  <main class="mt-10 flex w-full flex-col items-center justify-center">
    <img src="/yuqi.webp" alt="YuqiJS logo" class="w-full max-w-md px-10" />
    <div class="mt-10">
      <h1 class="text-center text-4xl font-extrabold text-pink-400">
        REST API's made magical 🪄
      </h1>
      <p
        class="max-w-lg text-center text-sm font-bold text-slate-400 sm:text-lg"
      >
        Build Typesafe End-to-End REST API's with ease, reduce mistakes and
        increase productivity
      </p>
    </div>
    <div class="flex flex-col gap-4 sm:flex-row sm:gap-8">
      <a href="/introduction">
        <button
          class="rounded-full bg-pink-400 px-8 py-3 transition-colors hover:bg-pink-500"
        >
          <span class="font-bold text-white no-underline"> Get Started </span>
        </button>
      </a>
      <a href="#">
        <button
          class="rounded-full bg-pink-200/50 px-8 py-3 font-bold text-pink-500 transition-colors hover:bg-pink-200/80"
        >
          Playground
        </button>
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
import VPNavBarMenuLink from "vitepress/dist/client/theme-default/components/vpnavbar.vue";
</script>

<template>
  <main class="mt-10 flex w-full flex-col items-center justify-center">
    <img src="/yuqi.webp" alt="YuqiJS logo" class="w-full max-w-sm" />
    <div class="mt-10">
      <h1 class="text-center text-4xl font-bold text-pink-400">
        REST API's made magical 🪄
      </h1>
      <p
        class="max-w-lg text-center text-sm font-semibold text-slate-400 dark:text-slate-300 sm:text-lg"
      >
        Build Typesafe End-to-End REST API's with ease, reduce mistakes and
        increase productivity
      </p>
    </div>
    <div class="flex gap-8">
      <button
        class="rounded-full bg-pink-400 px-8 py-3 font-semibold text-white"
      >
        Get Started
      </button>
      <button
        class="rounded-full border border-pink-400 bg-pink-200/50 px-8 py-3 font-semibold text-pink-500"
      >
        Playground
      </button>
    </div>
  </main>
</template>

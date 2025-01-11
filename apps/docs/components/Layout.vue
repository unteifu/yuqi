<script setup>
import DefaultTheme from "vitepress/theme";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div
      class="fixed left-0 top-0 z-50 flex h-12 w-full items-center justify-center bg-pink-50"
    >
      <span class="text-center text-sm font-bold text-pink-400"
        >YuqiJS is in early development! Please use with caution. 🚧
      </span>
    </div>
    <DefaultTheme.Layout>
      <template #default="{ Component, props }">
        <div class="content-wrapper">
          <Component v-bind="props" />
        </div>
      </template>
    </DefaultTheme.Layout>
  </div>
</template>

// Styling required to make top banner work (comment when banner not in use)
<style>
.Layout,
.VPNav {
  padding-top: 24px;
}

.VPNavScreen {
  margin-top: 48px;
}

.VPSidebar.open {
  padding-top: 32px;
}

@media (min-width: 960px) {
  .Layout,
  .VPSidebar {
    padding-top: 48px;
  }

  #app > div > div.Layout > div.VPLocalNav.has-sidebar > div {
    padding-top: 48px;
  }

  .VPNav {
    padding-top: 47px;
  }

  #app
    > div
    > div.Layout
    > header
    > div
    > div.wrapper
    > div
    > div.title
    > div
    > a {
    border-color: transparent !important;
  }

  .VPDocAside,
  #VPSidebarNav {
    padding-top: 48px !important;
  }
}

.VPSidebar {
  padding-top: calc(--vp-nav-height + 48px) !important;
}
</style>

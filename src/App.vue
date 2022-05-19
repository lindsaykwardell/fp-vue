<template>
  <main class="flex h-screen bg-gray-300 justify-center items-center">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRunnerStore } from "./stores/runner";
import "@/assets/tailwind.css";

const store = useRunnerStore();
onMounted(() => store.initializeTests());
</script>

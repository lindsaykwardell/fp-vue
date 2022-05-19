<template>
  <main class="flex h-screen bg-gray-300 justify-center items-center">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useTestStore } from "./stores/tests";
import "@/assets/tailwind.css";

const store = useTestStore();
onMounted(() => store.initializeTests());
</script>

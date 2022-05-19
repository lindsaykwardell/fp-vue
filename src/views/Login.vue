<template>
  <div class="bg-white shadow-lg flex flex-col items-center w-64">
    <h1 class="text-2xl">Login</h1>
    <form @submit.prevent="signInUser" class="flex flex-col items-center">
      <label>
        <h2 class="py-2">Username:</h2>
        <input
          v-model="username"
          class="shadow-md bg-gray-200 p-2 flex-grow mr-4"
          placeholder="Username"
        />
      </label>
      <button
        class="py-1 px-4 rounded my-3"
        :class="{
          'text-green-700 bg-green-200': !username.length,
          'bg-green-300 hover:bg-green-400': username.length,
        }"
        :disabled="!username.length"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";

const username = ref("");
function signInUser() {
  router.push("/");
}
</script>

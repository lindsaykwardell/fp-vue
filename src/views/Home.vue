<template>
  <div class="tester bg-white shadow-lg flex flex-col">
    <Header>Test Runner</Header>
    <div class="flex flex-grow">
      <div class="w-3/5 p-4 overflow-y-scroll">
        <div>
          <h2 class="text-xl">Tests</h2>
          <TestList :tests="getTests" />
        </div>
      </div>
      <div class="w-2/5 border-l p-4 flex flex-col items-center">
        <TestRunner
          :testRunnerStatus="testRunnerStatus"
          :tests="getTests"
          @initTests="initTests"
        />
      </div>
    </div>
    <div
      v-if="testRunnerStatus === 'FINISHED'"
      class="bg-yellow-500 h-16 text-white flex justify-center items-center font-bold tests-complete"
    >
      <h2 class="text-2xl">All tests have completed!</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTestStore } from "@/stores/tests";
import Header from "@/components/Header.vue";
import TestList from "@/components/TestList.vue";
import TestRunner from "@/components/TestRunner.vue";

const store = useTestStore();
const testRunnerStatus = computed(() => store.testRunnerStatus);
const getTests = computed(() => store.getTests);

async function initTests(): Promise<void> {
  if (testRunnerStatus.value === "RUNNING") return;

  store.runTests();
}
</script>

<style lang="pcss" scoped>
.tester {
  width: 900px;
  min-height: 600px;
}
</style>

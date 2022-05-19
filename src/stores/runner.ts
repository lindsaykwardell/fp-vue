import { defineStore } from "pinia";
import { getInitialTests } from "../assets/tests";
import type { Test, TestStatus } from "../assets/tests";

export const useRunnerStore = defineStore({
  id: "runner",
  state: (): {
    tests: Test[];
  } => ({
    tests: [],
  }),
  getters: {
    getTests: (state) =>
      [...state.tests].sort((a, b) => {
        if (a.status === b.status) return 0;

        if (a.status === "RUNNING") return -1;
        if (b.status === "RUNNING") return 1;

        if (a.status === "SUCCESS") return -1;
        if (b.status === "SUCCESS") return 1;

        if (a.status === "FAILURE") return -1;
        if (b.status === "FAILURE") return 1;

        return 0;
      }),
    nextTestId: (state) => state.tests.length + 1,
    testRunnerStatus: (state) => {
      if (!state.tests.find((test) => test.status !== "IDLE")) {
        return "IDLE";
      } else if (state.tests.find((test) => test.status === "RUNNING")) {
        return "RUNNING";
      } else {
        return "FINISHED";
      }
    },
  },
  actions: {
    async initializeTests() {
      this.tests = await getInitialTests();
    },
    addTest(description: string) {
      this.tests = [
        ...this.tests,
        { description, id: this.nextTestId, status: "IDLE", results: [] },
      ];
    },
    updateTest(input: Test) {
      this.tests = this.tests.map((test) =>
        test.id === input.id ? input : test
      );
    },
    storeResult(testId: number, result: boolean) {
      this.tests = this.getTests.map((test) => {
        if (test.id === testId) {
          return {
            ...test,
            status: result ? "SUCCESS" : "FAILURE",
            results: [...test.results, result],
          };
        } else {
          return test;
        }
      });
    },
    runTests() {
      this.getTests.forEach(async (test) => {
        this.updateTest({ ...test, status: "RUNNING" });

        const delay = 2000 + Math.random() * 2000;
        const testPassed = Math.random() > 0.5;

        await waitfor(delay);

        this.storeResult(test.id, testPassed);
      });
    },
  },
});

const waitfor = async (time: number): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );

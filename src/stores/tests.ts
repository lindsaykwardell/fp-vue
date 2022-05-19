import { defineStore } from "pinia";

export type Test = {
  id: number;
  description: string;
  status: TestStatus;
  results: boolean[];
};

export type TestStatus = "IDLE" | "RUNNING" | "SUCCESS" | "FAILURE";

export const useTestStore = defineStore({
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
      this.tests = this.tests.map((test) => {
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
      this.tests.forEach(async (test) => {
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

const getInitialTests = async (): Promise<Test[]> => [
  {
    id: 1,
    description: "Vue views are viewable",
    status: "IDLE",
    results: [],
  },
  {
    id: 2,
    description: "Reactive components react properly",
    status: "IDLE",
    results: [],
  },
  {
    id: 3,
    description: "Angular brackets are not round",
    status: "IDLE",
    results: [],
  },
  {
    id: 4,
    description: "Svelte file extensions are looking stylish",
    status: "IDLE",
    results: [],
  },
  {
    id: 5,
    description: "Web component elements are sufficiently lit",
    status: "IDLE",
    results: [],
  },
  {
    id: 6,
    description: "Elm trees function as expected",
    status: "IDLE",
    results: [],
  },
];

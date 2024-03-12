import { test } from "vitest";
import { initializeWasm } from "./initializeWasm.js";

test("default", async () => {
  await initializeWasm();
});

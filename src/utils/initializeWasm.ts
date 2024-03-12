import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { initWasm } from "@resvg/resvg-wasm";
import { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function initializeResvg() {
  try {
    const buffer = readFileSync(resolve(__dirname, "../wasm/resvg.wasm"));
    await initWasm(buffer);
  } catch (err) {
    if (err instanceof Error && err.message.includes("Already initialized")) {
      return;
    }
    throw err;
  }
}

async function inititalizeYoga() {
  const buffer = readFileSync(resolve(__dirname, "../wasm/yoga.wasm"));
  const yoga = await initYoga(buffer);
  init(yoga);
}

let initialized = false;

export async function initializeWasm() {
  if (initialized) return;
  await Promise.all([initializeResvg(), inititalizeYoga()]);
  initialized = true;
}

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

await copyWasm();

async function copyWasm() {
  const distDir = resolve(__dirname, "../src/lib/wasm");
  mkdirSync(distDir);
  copyFileSync(
    resolve(__dirname, "../src/wasm/resvg.wasm"),
    resolve(distDir, "resvg.wasm"),
  );
  copyFileSync(
    resolve(__dirname, "../src/wasm/yoga.wasm"),
    resolve(distDir, "yoga.wasm"),
  );
}

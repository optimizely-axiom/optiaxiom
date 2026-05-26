import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "rolldown";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  input: path.resolve(__dirname, "container.tsx"),
  output: {
    file: path.resolve(
      __dirname,
      "../../../public/federated-widget/remoteEntry.js",
    ),
    format: "esm",
  },
  transform: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    jsx: {
      runtime: "automatic",
    },
  },
});

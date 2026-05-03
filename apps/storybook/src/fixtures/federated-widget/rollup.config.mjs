import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import path from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "rollup-plugin-esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: path.resolve(__dirname, "container.tsx"),
  output: {
    file: path.resolve(
      __dirname,
      "../../../public/federated-widget/remoteEntry.js",
    ),
    format: "esm",
  },
  plugins: [
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    nodeResolve({ extensions: [".tsx", ".ts", ".js"] }),
    commonjs(),
    esbuild(),
  ],
};

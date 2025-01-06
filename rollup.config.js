import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";

const isProduction = process.env.NODE_ENV === "production";

export default [
  {
    input: "src/index.ts", // Your entry file
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/mjs/index.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
        extensions: [".js", ".ts"], // Ensure TypeScript files are resolved
      }),
      commonjs(),
      json(),
      typescript({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
        clean: true, // Clean previous build artifacts
      }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        ),
      }),
    ],
    external: [
      "puppeteer", // Ensure external dependencies are not bundled
      // "puppeteer-core",
      // "fs",
      // "path",
    ],
  },
];

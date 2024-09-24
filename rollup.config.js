import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import json from '@rollup/plugin-json';

const isProduction = process.env.NODE_ENV === "production";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: !isProduction,
    },
    {
      file: "dist/mjs/index.js",
      format: "es",
      sourcemap: !isProduction,
    },
  ],
  plugins: [
    // replace({
    //   this: "undefined",
    //   preventAssignment: true,
    // }),
    // json(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: !isProduction,
    }),
  ],
  external: ["axios"],
};

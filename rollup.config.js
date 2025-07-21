const typescript = require("rollup-plugin-typescript2");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const dts = require("rollup-plugin-dts").default;

module.exports = [
  // 1️⃣ JS bundling (ESM & CJS)
  {
    input: "src/AntiAds.tsx",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        exports: "named",
      },
      {
        file: "dist/index.es.js",
        format: "esm",
        exports: "named",
      },
    ],
    plugins: [resolve(), commonjs(), typescript()],
    external: ["react", "react-dom"],
  },
  // Declaration bundling
  {
    input: "src/AntiAds.tsx",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];

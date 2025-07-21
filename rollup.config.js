const typescript = require("rollup-plugin-typescript2");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");

module.exports = {
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
};

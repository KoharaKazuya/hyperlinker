import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/background.js",
    output: {
      dir: "dist",
    },
  },
  {
    input: "src/content.js",
    output: {
      dir: "dist",
      format: "iife",
    },
  },
  {
    input: "src/bookmarklet.js",
    output: {
      file: "hyperlinker.bookmarklet",
    },
    plugins: [terser(), bookmarklet()],
  },
];

function bookmarklet() {
  return {
    renderChunk(code, chunk, options) {
      return `javascript:(()=>{${code}})()`;
    },
  };
}

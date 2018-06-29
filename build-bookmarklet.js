const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const MemoryFS = require("memory-fs");

const webpackBuild = () => {
  const outputFileName = "bookmarklet.js";
  const outputFilePath = path.resolve(__dirname, "dist", outputFileName);

  return new Promise((resolve, reject) => {
    const compiler = webpack({
      mode: "production",
      entry: path.resolve(__dirname, "src", "bookmarklet"),
      output: {
        filename: outputFileName
      }
    });

    const fs = new MemoryFS();
    compiler.outputFileSystem = fs;

    compiler.run((err, stats) => {
      // ===== Error Handling =====

      if (err) {
        reject(err.stack || err);
        if (err.details) {
          reject(err.details);
        }
        return;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        reject(info.errors);
      }

      if (stats.hasWarnings()) {
        reject(info.warnings);
      }

      // ===== read output =====

      const output = fs.readFileSync(outputFilePath, "utf-8");
      resolve(output);
    });
  });
};

const bookmarkletWrapper = source =>
  `javascript:void(function(){${source}}());`;

const writeBookmarkletToReadme = source => {
  const outputPath = path.resolve(__dirname, "./hyperlinker.bookmarklet");
  fs.writeFileSync(outputPath, source);
};

(async () => {
  const js = await webpackBuild();
  const bookmarklet = bookmarkletWrapper(js);
  writeBookmarkletToReadme(bookmarklet);
})();

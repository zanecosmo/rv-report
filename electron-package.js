const packager = require("electron-packager");

async function buildElectronApp(options) {
  const appPaths = await packager(options);
  console.log(`Electron app bundles created:\n${appPaths.join("\n")}`);
};

const options = {
  dir: "./",
  arch: "x64",
  asar: true,
  overwrite: true,
  platform: "win32",
  out: "./package",
  name: "Inspection Reports",
  ignore: [
    /src/,
    /ts.config/,
    /.git/,
    /.gitignore/,
    /electron-package.js/,
    /nodemon.json/,
    /webpack.config.json/
  ]
};

buildElectronApp(options);
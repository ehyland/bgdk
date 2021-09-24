module.exports = {
  presets: [
    ["@babel/preset-env", { exclude: ["@babel/plugin-transform-regenerator"] }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};

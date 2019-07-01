require('@babel/register')({
  ignore: [/\/(build|node_modules)\//],
  presets: [
    "@babel/preset-env",
  ],
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    "dynamic-import-node",
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ]
  ]
});

const PostmanFetch = require('./PostmanFetch').default;

module.exports = PostmanFetch;

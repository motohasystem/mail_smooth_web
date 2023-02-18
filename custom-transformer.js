const babelJest = require("babel-jest");
const babelOptions = {
    presets: [
        ["@babel/env", {
            "targets": {
                "node": "current",
            },
            "exclude": ["transform-regenerator"],
        }],
        ['@babel/preset-env', {
            targets: {
                node: 'current'
            }
        }],
        '@babel/preset-typescript'
    ],
    babelrc: false,
};
module.exports = babelJest.createTransformer(babelOptions);

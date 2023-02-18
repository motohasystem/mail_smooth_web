/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: [
        "<rootDir>/src/*.test.ts",
    ],
    "moduleFileExtensions": [
        "ts",
        "js",
        "jsx",
    ],
    "moduleDirectories": [
        "node_modules",
        "client",
    ],
    "transform": {
    //   "^.+\\.jsx?$": "babel-jest",
        "^.+\\.jsx?$": "./custom-transformer.js"
    }
};

module.exports = {
    setupTestFrameworkScriptFile: "<rootDir>/src/tests/setupTest.ts",
    testEnvironment: "jsdom",
    testMatch: [
        "**/**/*.test.ts?(x)",
        "**/**/*.test.js?(x)",
        "**/?(*.)+(spec|test).js?(x)"
    ],
    modulePaths: [
        "<rootDir>/src",
        "<rootDir>/node_modules"
    ],
    globals: {
        "NODE_ENV": "test"
    },
    verbose: true,
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json"
    ],
    transform: {
        "^.+\\.jsx?$": "ts-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    transformIgnorePatterns: ["/node_modules/(?!(react|seb-react-components)/)"], // <-- this allows babel to load only the node modules I need (which is lodash-es) and ignore the rest
    testEnvironment: "node",
    moduleNameMapper: {
        "aurelia-(.*)": "<rootDir>/node_modules/$1",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/src/tests/__mocks__/fileMock.js",
        "\\.(css|less|scss)$": "<rootDir>/src/tests/__mocks__/styleMock.js"
    }
};
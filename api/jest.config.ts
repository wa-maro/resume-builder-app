import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",

  roots: ["<rootDir>/src"],

  testMatch: ["**/*.spec.ts", "**/*.test.ts"],

  moduleFileExtensions: ["ts", "js"],

  transform: {
    "^.+\\.ts$": "@swc/jest",
  },

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
};

export default config;

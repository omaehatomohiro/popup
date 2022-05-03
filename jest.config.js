/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ["<rootDir>/tests", "<rootDir>/lib"],
  resetMocks: false,
  setupFiles: ["jest-localstorage-mock"],
  verbose: true,
  testURL: "http://localhost/",
};
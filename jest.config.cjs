/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/default-esm", // Use ES module preset for ts-jest
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }], // Enable ES module support
  },
  extensionsToTreatAsEsm: [".ts"], // Treat .ts files as ES modules
};

module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "firestore",
      settings: {
        projectId: "coding-pixels-2b3e0",
      },
      options: {
        // Connect to a local running Firestore emulator
        // when running in development mode
        useEmulator: env("NODE_ENV") == "development",
      },
    },
  },
});

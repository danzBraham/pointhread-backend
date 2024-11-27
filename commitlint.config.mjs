export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation changes
        "style", // Code style changes
        "refactor", // Code changes that neither fix bug nor add feature
        "perf", // Performance improvements
        "test", // Adding or fixing tests
        "build", // Build system or external dependencies
        "ci", // CI/CD configuration
        "chore", // Other changes
        "revert", // Revert previous commit
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "lower-case"],
    "scope-enum": [
      2,
      "always",
      [
        "auth", // Authentication/authorization
        "api", // API endpoints/routes
        "db", // Database related
        "thread", // Thread processing
        "ai", // AI integration/logic
        "config", // App configuration
        "deps", // Dependencies
        "test", // Test-related changes
        "types", // TypeScript types/interfaces
        "docker", // Docker configuration
      ],
    ],
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 72],
  },
};

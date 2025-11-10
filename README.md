# KristoffelMenuApp

Simple Expo React Native app for Chef Christoffel — menu, order and summary screens.

## Quick start (Windows)

1. Install deps:

   ```bash
   npm install
   ```

   - If using Expo managed workflow: expo install

2. Start dev server (clear cache):

   ```bash
   expo start -c
   ```

3. Open web: the app root redirects to /menu (see app/index.tsx)

## Important routes (expo-router)

- / (root) -> redirects to /menu
- /menu -> Menu screen
- /order -> Order screen (accepts ?order=JSON_ARRAY_OF_IDS)
- /summary -> Summary screen
- /summary-details -> optional enhanced summary screen
- /home -> Home screen (shows average prices)

## Notes

- Currency uses South African Rand formatting (R0.00).
- If you see metro errors about missing modules (expo-clipboard), either remove top-level import or install:
  - expo install expo-clipboard
- If you see ENOENT '<anonymous>' errors: stop Metro and run expo start -c, ensure no stray files with unusual names exist in project root.

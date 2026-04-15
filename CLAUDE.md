# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn start         # Start Metro dev server
yarn ios           # Run on iOS simulator
yarn android       # Run on Android emulator
yarn test          # Run Jest tests
yarn test --testPathPattern=App  # Run a single test file
yarn lint          # Run ESLint
```

Use **yarn** (not npm) to install dependencies: `yarn add <package>`

Requires Node >= 22.11.0.

## Architecture

**Cafe.log** is a Portuguese-language mobile coffee diary built with React Native (bare workflow, no Expo runtime). Users log coffee entries with brand, type, intensity, and quantity.

### Data flow

```
App.tsx
  └── HomeScreen (state owner)
        ├── useCoffees() hook  ← all CRUD logic lives here
        │     └── coffeeService  ← pure functions (add/edit/delete)
        ├── CoffeeCard          ← renders each entry; emits edit/delete
        ├── CoffeeForm          ← modal form for add & edit
        ├── Header / EmptyState ← presentational only
```

State is local (`useState` inside `useCoffees`). Data is persisted with `AsyncStorage` — the full list is saved as JSON under the key `@cafelog:coffees` on every change and loaded on app start.

### Coffee data model

```typescript
type Coffee = {
  id: string
  brand: string
  type: 'Espresso' | 'Cappuccino' | 'Latte' | 'Americano' | 'Cold Brew' | 'Macchiato'
  intensity: 1 | 2 | 3 | 4 | 5
  quantity: number  // grams
}
```

### Key conventions

- All source lives under `src/` with subdirectories: `components/`, `screens/`, `hooks/`, `services/`, `types/`
- Styling uses React Native `StyleSheet` with a coffee-themed palette: dark bg `#0F0600`, gold accent `#D4924A`, light text `#F0E2D0`
- The app has one screen (`HomeScreen`); new screens would require adding a navigation library

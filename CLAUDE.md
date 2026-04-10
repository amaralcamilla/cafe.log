# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start Metro dev server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm test           # Run Jest tests
npm test -- --testPathPattern=App  # Run a single test file
npm run lint       # Run ESLint
```

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

State is local (`useState` inside `useCoffees`). There is no persistence layer — data resets on app reload.

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

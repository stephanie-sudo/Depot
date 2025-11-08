# AGENTS.md — Next.js (Pages) + Chakra UI (TypeScript)

This document defines how **Codex** must behave when generating, editing, or reviewing code in this repository: a **Next.js (Pages Router)** + **TypeScript** app using **Chakra UI** and **NextConfig i18n**.

---

## 1) Mission & Scope

* **Mission:** Ship a fast, accessible, localized UI with small, composable components and zero ad‑hoc styling.
* **Scope:** Next.js **Pages Router**, Chakra UI theming, i18n with `next.config.js`, client/server data fetching, testing, and CI. Target **Node ≥ 18**, **TS ≥ 5**, **Next ≥ 13 (pages)**.

> **Hard rule:** **NEVER** hardcode colors or ad‑hoc CSS. Use **theme tokens** and Chakra variants only. If a token is missing, **extend the theme first**.

---

## 2) Core Principles (Non‑Negotiable)

* **Design Tokens First:** Colors, spacing, radii, shadows, typography live in `theme/`. Components reference tokens only.
* **A11y by default:** Semantics, focus management, keyboard nav, contrast. Prefer Chakra primitives and accessible patterns.
* **Single Responsibility:** Each component does one thing well; prefer composition over configuration.
* **Type Safety:** Strict TypeScript for props, API types, and i18n keys.
* **i18n everywhere:** All user‑visible strings come from locale messages; pages are locale‑aware.
* **KISS / DRY / YAGNI:** Keep it simple; do not duplicate logic or over‑engineer.

> **NEVER** introduce code that violates these principles without a written justification in the PR description.

---

## 3) Absolute Do/Don’t Rules

**ALWAYS**

1. Keep components **small** (target \~50–150 LOC). Extract subcomponents/hooks as they grow.
2. Use **Chakra props & variants**; reference **theme tokens** only.
3. Read strings from **messages** (`i18n/messages`), not literals in components.
4. Add/maintain **unit tests** for public components, hooks, and utilities.
5. Type **all props** and **public functions**; enable `--strict`.
6. Make **links locale‑aware**; preserve `router.locale` unless explicitly switching.
7. Handle **loading/empty/error** states explicitly and accessibly.
8. Co-locate story/docs (or MDX examples) for complex components.
9. Use **ESLint + Prettier**; keep the tree lint‑clean.
10. Keep **dependencies minimal** and justified.

**NEVER**

1. **NEVER** hardcode colors/spacing/typography or use inline `style={{ ... }}` for design. Use tokens/variants.
2. **NEVER** duplicate component logic—**refactor** shared parts into hooks/utilities.
3. **NEVER** hardcode user‑visible strings in components.
4. **NEVER** ship inaccessible UI (missing labels, poor contrast, broken focus traps, click‑only interactions).
5. **NEVER** fetch data directly in component bodies without a hook and proper error/loading handling.
6. **NEVER** bypass TypeScript with `any` unless narrowly justified with a comment.
7. **NEVER** commit secrets or rely on env vars without schema validation.
8. **NEVER** ignore ESLint or test failures by disabling rules broadly; whitelist **narrowly** with comments.

---

## 4) Project Structure (Pages Router)

```
.
├─ next.config.js
├─ tsconfig.json
├─ public/
├─ pages/
│  ├─ _app.tsx
│  ├─ _document.tsx
│  ├─ api/          # (if used) API routes
│  ├─ index.tsx
│  ├─ [...slug].tsx # dynamic pages as needed
├─ components/
│  ├─ primitives/   # small building blocks (Box wrappers, Buttons, etc.)
│  ├─ layout/       # header, footer, nav
│  └─ [feature]/    # feature‑scoped UI
├─ hooks/
├─ theme/
│  ├─ index.ts      # extendTheme + tokens + component style configs
│  └─ foundations/  # colors, space, radii, shadows, typography
├─ i18n/
│  ├─ messages/
│  │  ├─ en.json
│  │  └─ de.json
│  └─ messages.ts   # loader + types
├─ lib/             # non‑UI utilities (fetchers, schemas)
├─ styles/
├─ tests/
│  ├─ unit/
│  └─ e2e/
└─ .github/workflows/ci.yml
```

---

## 5) Global Providers (Chakra + Color Mode)

**`pages/_app.tsx`** wraps pages with Chakra. Keep it minimal; all global providers live here.

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
```

**`pages/_document.tsx`** ensures proper HTML scaffolding and hydration.

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

## 6) Theming & Design Tokens (no hardcoded colors)

* All visual tokens (colors, spacing, radii, shadows, typography) live in **`theme/`**.
* Use **variants** and **colorScheme**; **never** inline hex/rgb.
* If a token/size is missing, **extend the theme** before using it in components.

```ts
// theme/index.ts
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f5f7ff',
      100: '#e8edff',
      200: '#cdd7ff',
      300: '#a3b5ff',
      400: '#6f88ff',
      500: '#3a5cff',
      600: '#2e49cc',
      700: '#223799',
      800: '#162566',
      900: '#0c153a',
    },
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'brand' },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: { bg: 'brand.600' },
          _active: { bg: 'brand.700' },
        },
        ghost: {
          color: 'brand.500',
          _hover: { bg: 'brand.50' },
        },
      },
    },
  },
});

export default theme;
```

---

## 7) i18n (NextConfig‑based)

* Locales are defined in **`next.config.js`** (`i18n.locales`, `i18n.defaultLocale`).
* Use `useRouter()` to read the **current locale** and to navigate between locales.
* All UI strings live in **`i18n/messages`** and are read via a loader that returns a `t` object.

```ts
// i18n/messages.ts
import en from './messages/en.json';
import de from './messages/de.json';

const dictionaries = { en, de } as const;
export type AppLocale = keyof typeof dictionaries;

export function getMessages(locale: string) {
  const key = (locale || 'en') as AppLocale;
  return dictionaries[key] ?? dictionaries.en;
}
```

**Locale‑aware links (preserve the current locale by default):**

```tsx
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Link } from '@chakra-ui/react';

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { locale } = useRouter();
  return (
    <Link as={NextLink} href={href} locale={locale} color="brand.500" _hover={{ textDecoration: 'underline' }}>
      {children}
    </Link>
  );
}
```

**Locale switcher:**

```tsx
import { useRouter } from 'next/router';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';

export function LocaleSwitcher() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  const setLocale = (next: string) => router.push({ pathname, query }, asPath, { locale: next });

  return (
    <Menu>
      <MenuButton as={Button} variant="ghost">{locale?.toUpperCase()}</MenuButton>
      <MenuList>
        <MenuItem onClick={() => setLocale('en')}>EN</MenuItem>
        <MenuItem onClick={() => setLocale('de')}>DE</MenuItem>
      </MenuList>
    </Menu>
  );
}
```

---

## 8) Component Guidelines (small & clean)

* **One responsibility per component**; if a file grows, split it.
* Prefer **Chakra primitives** (`Box`, `Flex`, `Stack`, etc.) + **theme tokens** for spacing, borders, colors.
* **No inline `style`** and **no hex codes**. Use `sx` sparingly and only with tokens.
* Separate **layout** and **data fetching** from complex presentation logic.

**Building blocks**

```tsx
// components/Section.tsx
import { Box, Container } from '@chakra-ui/react';
export function Section({ children, bg, py = 16 }: { children: React.ReactNode; bg?: string; py?: number | string }) {
  return (
    <Box as="section" bg={bg} py={py}>
      <Container maxW="container.lg">{children}</Container>
    </Box>
  );
}
```

```tsx
// components/Button.tsx
import { Button as CButton, type ButtonProps } from '@chakra-ui/react';
export function Button(props: ButtonProps) {
  return <CButton {...props} />; // inherits theme colorScheme/variants
}
```

```tsx
// components/Header.tsx
import { Flex, HStack, Spacer } from '@chakra-ui/react';
import { TextLink } from './TextLink';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Header() {
  return (
    <Flex as="header" h="16" align="center" px={4} borderBottomWidth="1px">
      <HStack spacing={6}>
        <TextLink href="/">Home</TextLink>
        <TextLink href="/about">About</TextLink>
      </HStack>
      <Spacer />
      <LocaleSwitcher />
    </Flex>
  );
}
```

```tsx
// components/Card.tsx
import { Box, useColorModeValue } from '@chakra-ui/react';
export function Card({ children }: { children: React.ReactNode }) {
  const bg = useColorModeValue('white', 'gray.800');
  const border = useColorModeValue('gray.200', 'gray.700');
  return (
    <Box bg={bg} borderWidth="1px" borderColor={border} rounded="xl" p={6}>
      {children}
    </Box>
  );
}
```

---

## 9) Data Fetching & State

* Prefer **`getStaticProps`/`getStaticPaths`** for content‑like pages; use **ISR** where appropriate.
* Use **`getServerSideProps`** only when data must be request‑time and user‑specific.
* For client fetching, use a thin `useSWR` or custom hook with **loading/error** states.
* Keep fetchers in `lib/` and **schema‑validate** responses (see Validation).

```ts
// lib/fetcher.ts
export async function jsonFetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}
```

---

## 10) Forms & Validation

* Use **react-hook-form** + **zod** (or Yup) for schemas.
* Keep inputs accessible; connect labels, describe errors with `aria-*`.
* Show validation messages via Chakra `FormErrorMessage`.

---

## 11) Error, Empty, and Loading States

* Provide clear **empty states** and **skeletons/spinners**.
* Errors must be **visible and actionable**; avoid silent failures.
* Use Chakra `Alert`/`AlertIcon` for error banners.

---

## 12) Accessibility (A11y)

* Use proper **semantic elements** and roles.
* Ensure **focus order** and **visible focus rings**.
* Meet **contrast** ratios for text and interactive elements.
* Test with **@testing-library/jest-dom** and **axe** (where feasible).

---

## 13) SEO & Metadata per locale

* Use `next/head` in each page. Derive strings from messages for **title/description**.
* If you use locale subpaths or domains, add `rel="alternate"` links.

```tsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getMessages } from '../i18n/messages';

export function SEO({ ns }: { ns: 'home' | 'about' | 'contact' }) {
  const { locale = 'en' } = useRouter();
  const t = getMessages(locale);
  const meta = t.seo[ns];
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
    </Head>
  );
}
```

---

## 14) Performance

* Use **`next/image`** for optimized images; always set `alt`.
* Keep bundle size in check; prefer **dynamic imports** for heavy components.
* Avoid unnecessary re‑renders: memoize heavy lists/items.
* Prefer **responsive design** with Chakra breakpoints.

---

## 15) Linting, Formatting & Type‑Checking

* **ESLint + Prettier** mandatory. Add a rule/heuristic to catch raw hex colors in TSX.
* **TypeScript strict mode** enabled.

```jsonc
// tsconfig.json (essentials)
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "target": "ES2021",
    "module": "ESNext",
    "jsx": "preserve",
    "moduleResolution": "Bundler",
    "baseUrl": ".",
    "paths": { "@/*": ["*"] }
  }
}
```

```js
// eslint.config.mjs (snippet)
export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Prefer Chakra props over inline style
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      // Catch raw hex colors in JSX
      'no-restricted-syntax': [
        'warn',
        {
          selector: "Literal[value=/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/]",
          message: 'Do not hardcode colors. Add tokens to theme and use them.',
        },
      ],
    },
  },
];
```

---

## 16) Validation & Env Vars

* Define an **env schema** (e.g., zod) and validate on startup; document required vars in README.
* Never access `process.env` deep in components; centralize in a small `lib/env.ts`.

---

## 17) Testing Policy

* **Unit/UI tests:** Jest + React Testing Library.
* **a11y checks:** `jest-axe` for critical flows.
* **E2E:** Playwright for critical journeys (happy path + error/empty states).
* Keep tests **deterministic** and **locale‑aware** (run key tests with multiple locales where feasible).

Example RTL test:

```tsx
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';
import { Button } from '@/components/Button';

test('Button renders with brand color scheme', () => {
  render(
    <ChakraProvider theme={theme}>
      <Button>Click</Button>
    </ChakraProvider>
  );
  expect(screen.getByRole('button', { name: /click/i })).toBeInTheDocument();
});
```

Coverage rule of thumb:

* **New UI/logic:** ≥ 80% lines/branches.
* **Bug fixes:** 100% for affected paths.

---

## 18) Git Hygiene & PRs

* Small, focused commits with imperative messages: `feat(ui): add Card component`.
* PRs ≤ \~300 LOC. Include **screenshots** for UI changes and list **a11y** and **i18n** considerations.
* PR description must include: **context, approach, trade‑offs, tests, risks**.

---

## 19) Definition of Done (DoD)

A task is **done** only if:

1. UI uses **theme tokens**; no inline colors/styles.
2. Components are **small**, typed, and accessible; loading/empty/error handled.
3. Locale coverage implemented for new strings; messages updated.
4. Lint, type‑check, and tests pass in CI; coverage acceptable.
5. Docs (README or stories) updated.

---

## 20) Reviewer Checklist

* [ ] Uses theme tokens; no raw colors/inline styles
* [ ] One responsibility per component; props clear and typed
* [ ] No duplication; hooks/utilities extracted
* [ ] Strings from messages; locale preserved in links
* [ ] A11y: roles/labels/contrast/focus managed
* [ ] Loading/empty/error states present
* [ ] Performance sane; heavy parts lazy‑loaded
* [ ] Tests added/updated; deterministic and passing

---

## 21) Prompt Patterns for Codex

* **Add component:**

  * *"Create a `Card` component using Chakra tokens only (no inline styles), with light/dark backgrounds via `useColorModeValue`. Include story and RTL test."*
* **Refactor duplication:**

  * *"Extract repeated link markup into `TextLink` that preserves `router.locale`. Replace usages and add a unit test."*
* **Add locale content:**

  * *"Introduce `t.seo.faq` and update `SEO` to support it, adding EN/DE messages and tests for title/description rendering."*

---

## 22) Anti‑Patterns (Reject on Sight)

* Hex/RGB values or ad‑hoc CSS in components.
* Components that mix data fetching, layout, and complex UI.
* Unlabeled interactive controls; missing keyboard/focus handling.
* Duplicated logic across pages/components.
* `any` types without justification; dead code.

---

## 23) Snippets & Templates

**`next.config.js` (i18n + strict mode)**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
};
module.exports = nextConfig;
```

**SEO helper** — see Section 13.

**Locale‑aware link** — see Section 7.

**Section/Card/Button/Header** — see Section 8.

---

## 24) Final Notes for Codex

* Prefer **clarity over cleverness**.
* Modify only what’s needed; minimize diff surface.
* Default to **composition**; keep components focused and typed.
* When uncertain, ask for **acceptance criteria** and propose a minimal, token‑driven plan.

> By following this AGENTS.md, Codex will consistently deliver a Next.js + Chakra UI app that is accessible, localized, and easy to evolve.

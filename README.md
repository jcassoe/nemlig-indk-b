# Nemlig Shopping Assistant

A small automation project for building a shopping assistant around nemlig.com.

## v0.1 goal

The first milestone is deliberately simple:

1. Open nemlig.com in a real browser.
2. Log in manually once.
3. Save the authenticated browser session locally.
4. Reuse that session in later runs.
5. Open a product search from the command line.

No checkout or order placement is automated in v0.1.

## Tech stack

- Node.js
- TypeScript
- Playwright
- GitHub Copilot for development assistance

## Setup

```bash
npm install
npx playwright install chromium
```

## 1. Save your Nemlig login session

```bash
npm run nemlig:login
```

A Chromium window opens. Log in to nemlig.com manually. When you are finished, return to the terminal and press Enter.

The authenticated browser state is saved locally under `.auth/nemlig.json`.

**Important:** `.auth/` is ignored by Git and must never be committed. It can contain session cookies that provide access to your account.

## 2. Test product search

```bash
npm run nemlig:search -- "minimælk"
```

This opens nemlig.com using the saved session and navigates to a search for the supplied term.

## Current project structure

```text
.
├── scripts/
│   ├── login.ts
│   └── search.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Next milestone

Once login and search have been verified against the live site, the next step is to detect search results reliably and add a selected product to the basket.

The application should continue to require explicit user approval before any order is finally placed.

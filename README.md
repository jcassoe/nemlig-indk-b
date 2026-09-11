# Nemlig Shopping Assistant

Browser-only shopping assistant prototype for nemlig.com.

The project is designed to work from **GitHub Codespaces**, so you do not need to install VS Code, Node.js or Playwright on your own PC.

## Current goal

The first milestone is deliberately simple:

1. Start the project in GitHub Codespaces.
2. Open a remote Chromium desktop in your normal browser.
3. Log in manually to nemlig.com.
4. Save the authenticated browser session inside the Codespace.
5. Reuse that session for product searches.

No checkout or final order placement is automated at this stage.

## Tech stack

- GitHub Codespaces
- Node.js + TypeScript
- Playwright
- Chromium
- noVNC remote desktop
- GitHub Copilot for development assistance

## Start from the GitHub website

Open this repository on GitHub and choose:

**Code → Codespaces → Create codespace on main**

The Codespace will install the required packages automatically. The first creation can take a little while because Chromium and the Linux browser dependencies are installed in the cloud environment.

## Open the remote Chromium screen

When the Codespace is ready:

1. Open the **PORTS** tab at the bottom of the Codespaces window.
2. Find port **6080**, labelled **Remote Chromium desktop**.
3. Click the globe/open-in-browser icon for port 6080.
4. A new browser tab opens showing the remote Linux desktop where Chromium will appear.

Nothing is installed on your own PC; this desktop and Chromium run inside the Codespace.

## Log in to Nemlig

In the Codespaces terminal run:

```bash
npm run nemlig:login
```

Chromium will appear in the remote desktop tab. Log in to nemlig.com there yourself.

When you are fully logged in, return to the Codespaces terminal and press **Enter**.

The authenticated browser state is then saved inside the Codespace at:

```text
.auth/nemlig.json
```

**Important:** `.auth/` is ignored by Git and must never be committed. The file can contain session cookies that provide access to your Nemlig account.

## Test a product search

After login has been saved, run:

```bash
npm run nemlig:search -- "minimælk"
```

The search opens in Chromium on the remote desktop using the saved Nemlig session.

## Project structure

```text
.
├── .devcontainer/
│   └── devcontainer.json
├── scripts/
│   ├── login.ts
│   ├── search.ts
│   └── start-remote-desktop.sh
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Security model

- Nemlig credentials are entered only into the actual Nemlig website in Chromium.
- The project does not ask you to store your Nemlig password in GitHub source code.
- The authenticated session is stored only in the Codespace and is excluded from Git.
- Final order placement should continue to require explicit user approval.

## Next milestone

Once login and search are confirmed to work, the next version will inspect real Nemlig search results, select a product and add it to the basket. After that we can build the actual shopping-assistant interface and shopping-history logic on top.

# NeuroFeed — The Future of News ⚡

**NeuroFeed** is an AI-powered, gamified news feed monorepo designed to revolutionize how we consume information. By leveraging an interactive, Tinder-style card-swiping interface, it turns reading the news into a personal intelligence-building habit. Swipe right to like and train your personalized AI agent, or swipe left to skip the noise.

---

## 🚀 Key Features

*   **Tinder-Style News Cards**: Swipe right to save and like a story, or swipe left to dismiss it.
*   **Key Insights Extraction**: Every article features custom, AI-extracted intelligence chips highlighting the main takeaways instantly.
*   **AI Chat Companion**: An interactive, contextual chat assistant to discuss current events, ask follow-up questions, or dig deeper into stories.
*   **Aesthetic Reports & Visualizations**: Get detailed breakdowns of your reading habits, topic interests, and trends through elegant analytics.
*   **Gamified Progress**: Earn XP (+10 XP per liked story), track reading streaks, and level up your knowledge profile.
*   **Cross-Platform**: Built on React Native (Expo), running seamlessly on iOS, Android, and the Web.

---

## 📂 Repository Structure

This repository is configured as a `pnpm` monorepo workspace.

```
├── artifacts/
│   ├── neurofeed/           # Expo React Native App (Frontend)
│   ├── api-server/          # Express 5 backend server (API Layer)
│   └── mockup-sandbox/      # Vite-powered component prototyping sandbox
├── lib/
│   ├── db/                  # PostgreSQL database client & Drizzle schema definitions
│   ├── api-spec/            # OpenAPI specification and Orval configuration
│   ├── api-zod/             # Generated Zod schemas (from OpenAPI spec)
│   └── api-client-react/    # Generated React-Query hooks (from OpenAPI spec)
├── scripts/                 # Build and development scripts
├── package.json             # Root monorepo configuration
├── pnpm-workspace.yaml      # Monorepo packages & catalogs mapping
└── replit.md                # Environment and platform notes
```

---

## 🛠️ Tech Stack

*   **Core**: TypeScript, Node.js 24, pnpm workspaces
*   **Frontend**: React Native, Expo 54, React Native Web, React Native Reanimated (animations), TanStack Query
*   **Backend**: Express 5, TypeScript, OpenAPI 3.1
*   **Database**: PostgreSQL, Drizzle ORM, Drizzle Zod
*   **Codegen**: Orval (generates React hooks & Zod validation directly from the OpenAPI spec)
*   **Build & Bundle**: esbuild, Vite

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (Version 24 recommended)
*   [pnpm](https://pnpm.io/) (Package manager required for this workspace)

### Installation

Clone the repository and install workspace dependencies at the root directory:

```bash
pnpm install
```

### Dev Commands

*   **Typecheck all packages**:
    ```bash
    pnpm run typecheck
    ```
*   **Build all packages**:
    ```bash
    pnpm run build
    ```
*   **Run the API Backend Server**:
    ```bash
    pnpm --filter @workspace/api-server run dev
    ```
*   **Run the Expo Frontend App**:
    ```bash
    pnpm --filter @workspace/neurofeed run dev
    ```
*   **Regenerate API Client Hooks & Schemas** (from OpenAPI spec):
    ```bash
    pnpm --filter @workspace/api-spec run codegen
    ```
*   **Push Database Schema Changes** (development mode):
    ```bash
    pnpm --filter @workspace/db run push
    ```

---

## 📄 License

This project is licensed under the MIT License. See the [package.json](package.json) file for details.

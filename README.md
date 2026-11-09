# Memory App

A browser-based, two-player Memory game built with **TypeScript, HTML, SCSS, and Vite**.

Players take turns revealing cards, finding matching pairs, and collecting points. The game includes multiple visual themes, configurable board sizes, and a responsive interface.

## Features

- **Two-player gameplay:** Blue Player vs. Orange Player
- **Four visual themes:** Code Vibes, Gaming, DA Projects, and Foods
- **Three board sizes:** 16, 24, or 36 cards
- **Customizable starting player**
- **Theme preview** on the settings screen
- **Randomized cards** at the start of each game
- **Animated card flipping** and matching-pair detection
- **Automatic turn switching** when cards do not match
- **Live score tracking** for both players
- **Exit confirmation dialog** to prevent accidental game cancellation
- **Game-over and result screens** displaying the winner or a draw
- **Responsive layout** for different screen sizes

## How to Play

1. Click **Play** on the home screen.
2. Select a game theme, starting player, and board size.
3. Click **Start** to begin the game.
4. Reveal two cards per turn.
5. If the cards match, the current player earns a point and keeps the turn.
6. If they do not match, the cards flip back and the turn passes to the other player.
7. Continue until all pairs have been found.
8. The player with the most matching pairs wins. Equal scores result in a draw.

## Technologies Used

| Technology | Purpose |
| --- | --- |
| HTML5 | Semantic page structure and templates |
| SCSS / Sass | Styling, responsive layouts, and visual themes |
| TypeScript | Game logic, state management, and DOM interactions |
| Vite | Development server and production builds |
| npm | Dependency management and project scripts |
| Git / GitHub | Version control and source code hosting |

The application uses **vanilla TypeScript** without a frontend framework.

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/EugenLiske/memory_app.git
```

Navigate to the project directory:

```bash
cd memory_app
```

Install the dependencies:

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Create a Production Build

```bash
npm run build
```

This command checks the TypeScript code and creates an optimized production build in the `dist/` directory.

### Preview the Production Build

```bash
npm run preview
```

This starts a local server for testing the production build.

## Project Structure

```text
memory_app/
├── public/                 # Static assets, images, and fonts
├── src/
│   ├── main.ts             # Application entry point
│   ├── ts/                 # Game logic and screen modules
│   │   ├── templates.ts
│   │   ├── game-settings.ts
│   │   ├── home-screen.ts
│   │   ├── settings-screen.ts
│   │   ├── game-screen.ts
│   │   ├── game-over-screen.ts
│   │   ├── result-screen.ts
│   │   └── ...
│   └── styles/             # SCSS stylesheets and partials
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

The project separates application logic, HTML templates, and styling to keep the code organized and maintainable.

## Application Architecture

The game follows a lightweight **single-page application (SPA)** approach.

A single `index.html` contains the main application container. TypeScript dynamically renders the home, settings, game, and result screens without requiring separate HTML pages.

The application uses:

- **Modular TypeScript files** for individual responsibilities
- **Centralized HTML templates** for screen markup
- **Shared game settings** for the selected theme, starting player, and board size
- **DOM data attributes** for screen-specific and theme-specific styling
- **SCSS partials** for reusable components, layouts, and theme variations

The card deck is generated dynamically according to the selected board size and theme.

## Deployment

Run the production build:

```bash
npm run build
```

The generated `dist/` directory contains the files required for deployment to a static web server.

Upload the **contents of `dist/`**, preserving the generated folder structure and asset paths.

The Vite configuration uses a relative base path to support deployment within a subdirectory.

## Project Background

This project was developed as part of the **Developer Akademie** training program.

Its purpose was to practice and strengthen skills in:

- TypeScript and type-safe application development
- DOM manipulation and event handling
- Game-state management and interactive logic
- Modular code organization
- SCSS architecture and responsive design
- Production builds and static deployment
- Git and GitHub workflows

## Author

**Eugen Liske**

GitHub: [@EugenLiske](https://github.com/EugenLiske)

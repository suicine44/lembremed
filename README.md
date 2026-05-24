# LembreMed

LembreMed is an interactive, mobile-first application designed to assist in
the healthcare routine of elderly individuals, serving as a bidirectional
simulator for both patients and caregivers. The project provides a smooth
mobile interface for medication scheduling, daily dosage compliance, and
emergency alert channels.

## Requirements

* Modern web browser (Chrome, Firefox, Safari, or Edge)
* Node.js (version 18 or higher - optional, recommended for syntax checking
  and testing)

## Installation

Open your system terminal and execute the following commands:

```bash
git clone https://github.com/suicine44/lembremed.git
cd lembremed
```

If you wish to use optional developer tools and utilities, install the
package dependencies:

```bash
npm install
```

## How to Run Locally

### Option 1: Open directly in your browser

Since this is a client-side application built with pure HTML5, CSS3, and
Vanilla JavaScript, you can simply open the `index.html` file in any web
browser or use editor extensions like VS Code's Live Server.

### Option 2: Basic local server with Node

If you have Node.js installed, you can start a simple static local server:

```bash
npx http-server . -p 8080
```

Then, open your browser and navigate to: `http://localhost:8080`

## Useful Scripts and Commands

The commands listed below are optional and serve to verify codebase
integrity:

* **JS Syntax Validation**:

  ```bash
  node -c js/main.js
  ```

* **Formatting/Style (Linter - optional)**:

  ```bash
  npm run lint
  ```

* **Build (if applicable - optional)**:

  ```bash
  npm run build
  ```

## Contribution and Development

To contribute to the development of LembreMed, please refer to our detailed
guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) guide.

There you will find all information regarding:

* Git workflow and Pull Requests.
* Commit standards (**Conventional Commits** in English).
* Design System guidelines and styling rules (CSS).
* Web architecture and deployment workflows.
* Accessibility standards (WCAG and WAI-ARIA).

## License

To be determined.

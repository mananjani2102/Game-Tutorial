# Game Tutorial

A collection of interactive web-based mini-games and UI components built with vanilla HTML, CSS, and JavaScript. Each project includes an original implementation alongside an enhanced modification — designed to demonstrate progressive front-end development techniques through practical, hands-on game building.

![GitHub repo size](https://img.shields.io/github/repo-size/mananjani2102/Game-Tutorial)
![GitHub last commit](https://img.shields.io/github/last-commit/mananjani2102/Game-Tutorial)
![GitHub stars](https://img.shields.io/github/stars/mananjani2102/Game-Tutorial?style=social)

---

## Table of Contents

- [Project Structure](#project-structure)
- [Projects Overview](#projects-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Learning Objectives](#learning-objectives)
- [Contributing](#contributing)
- [Author](#author)

---

## Project Structure

```
Game-Tutorial/
│
├── Click Counter/
│   ├── index.html
│   ├── index.css
│   └── index.js
│
├── Click Counter modification/
│   ├── index.html
│   ├── index.css
│   └── index.js
│
├── Colour-Picker/
│   ├── index.html
│   ├── index.css
│   └── index.js
│
├── Colour-Picker-modification/
│   ├── index.html
│   ├── index.css
│   └── index.js
│
├── Memory Flip Card/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── Registration-Form/
│   ├── index.html
│   ├── index.css
│   └── index.js
│
├── Todo-list/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── Typing-speed-test/
│   ├── index.html
│   ├── index.css
│   └── script.js
│
├── Whack-a-Mole/
│   ├── index.html
│   ├── index.css
│   └── index.js
│
└── Whack-a-Mole-modification/
    ├── index.html
    ├── index.css
    └── index.js
```

---

## Projects Overview

### Click Counter

An interactive counter application built as a foundation for understanding DOM manipulation and event handling in JavaScript.

- Increment, decrement, and reset counter functionality
- Visual feedback on every user interaction
- **Modification version** introduces speed multipliers, score tracking, and enhanced animations

---

### Colour Picker

A dynamic colour selection and palette management tool.

- Pick colours via sliders or direct hex input
- Live colour preview updated in real time
- One-click copy of colour codes to clipboard
- **Modification version** introduces saved palettes, gradient generator, and colour history

---

### Memory Flip Card

A classic card-matching memory game focused on logic, timing, and state management.

- Flip cards to find and match pairs
- Move counter and countdown timer
- Fisher-Yates shuffle algorithm for fully randomized card placement
- Win detection with a completion screen

---

### Registration Form

A production-style user registration form with robust client-side validation.

- Real-time input validation on all fields
- Password strength indicator
- Descriptive error messages and success feedback
- Clean, accessible UI with focus on usability

---

### Todo List

A fully functional task management application demonstrating CRUD operations in JavaScript.

- Create, read, update, and delete tasks
- Mark tasks as complete with visual distinction
- Filter view by status: All, Active, or Completed
- Session-persistent task state

---

### Typing Speed Test

A real-time typing performance analyser measuring speed and accuracy under timed conditions.

- Live WPM (Words Per Minute) calculation
- Accuracy percentage computed on every keystroke
- Configurable countdown timer
- Multiple difficulty levels with varying passage complexity

---

### Whack-a-Mole

An arcade-style reaction game implementing randomized game loops and progressive difficulty.

- Randomized mole appearances with no repeating patterns
- Live score tracking with session high score
- Speed increases progressively as the score rises
- **Modification version** adds bombs, power-ups, and a lives system

---

## Tech Stack

| Technology       | Purpose                                      |
|------------------|----------------------------------------------|
| HTML5            | Semantic document structure and markup       |
| CSS3             | Styling, keyframe animations, and layout     |
| JavaScript ES6+  | Game logic, DOM manipulation, and state      |

No external frameworks, libraries, or dependencies. Every project runs entirely on native browser APIs.

---

## Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, or Safari)
- No installation or build process required

### Running a Project Locally

```bash
# Clone the repository
git clone https://github.com/mananjani2102/Game-Tutorial.git

# Navigate into the directory
cd Game-Tutorial

# Open any project — for example:
cd "Whack-a-Mole"
start index.html      # Windows
open index.html       # macOS
xdg-open index.html   # Linux
```

Alternatively, double-click any `index.html` file directly to open it in your default browser.

---

## Learning Objectives

This repository is structured to help developers progressively build competency in the following areas:

- DOM selection, traversal, and manipulation
- Browser event handling including click, keyboard, and timer events
- CSS animations, transitions, and responsive design patterns
- Game loop design and client-side state management
- Client-side form validation and user feedback patterns
- Writing modular, maintainable vanilla JavaScript
- Refactoring and extending existing codebases (base vs. modification projects)

---

## Contributing

Contributions, improvements, and new game additions are welcome.

```bash
# Step 1 — Fork the repository on GitHub

# Step 2 — Clone your fork
git clone https://github.com/your-username/Game-Tutorial.git

# Step 3 — Create a new feature branch
git checkout -b feature/your-feature-name

# Step 4 — Make your changes and commit
git add "your-file"
git commit -m "add: brief description of your change"

# Step 5 — Push your branch
git push origin feature/your-feature-name

# Step 6 — Open a Pull Request on GitHub
```

Please ensure your code is clean, well-commented, and consistent with the existing project structure before submitting a pull request.

---

## Author

**Manan Jani**

[![GitHub](https://img.shields.io/badge/GitHub-mananjani2102-black?style=flat&logo=github)](https://github.com/mananjani2102)

---

<div align="center">
  If you found this repository useful, consider giving it a star on GitHub.
</div>

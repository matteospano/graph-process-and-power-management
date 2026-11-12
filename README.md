# Mini-Mind Sim

Mini-Mind Sim is a lightweight browser-based prototype that explores a cooperative card-game mechanic through a compact, interactive simulation. Built as a front-end experiment, it models turn flow, discard risk, and probabilistic decision-making in a simplified environment inspired by the tension and rhythm of The Mind.

The project is intentionally small and focused: a single simulation loop, a simple UI, and a minimal rule set that make it easy to experiment with player behavior and risk assessment without the overhead of a full production game architecture.

## Overview

This demo presents a four-player scenario in which each participant receives two cards from a fixed range. Players must decide whether to play their lowest usable card or wait for a better moment, while the system tracks the current table value, discarded cards, and total turn count.

The interface is designed to reveal the core experiment clearly:

- one human-controlled player faces a set of automated opponents
- bot behavior is driven by a basic probability estimate
- the player can compare their own choice against the system's calculated risk
- final results summarize played and discarded cards at the end of the run

## What the project demonstrates

- probabilistic decision logic for simple card-game AI
- turn-based state management in the browser
- interactive UI for testing strategic choices
- a compact, experiment-friendly ruleset rather than a large game implementation

## Project structure

- `main.HTML` – page structure and game entry point
- `functions.TS` – game logic, simulation state, card distribution, and bot decisions
- `style.css` – styling for the interface and layout

## Running locally

Because this is a lightweight static demo, you can run it using any simple local web server:

```bash
cd /workspaces/mind-number-guess
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/main.HTML
```

## Notes

This project is best understood as a playable UI prototype and design experiment. It prioritizes clarity and experimentation over polish, making it suitable for prototyping ideas around probabilistic gameplay, hidden information, and turn pacing.

The simulation is intentionally compact and readable, so it can be extended easily with new rules, different AI models, or richer player interactions.

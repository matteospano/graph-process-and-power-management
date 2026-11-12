# Mini-Mind Sim

Mini-Mind Sim is a compact browser-based simulation designed to study decision-making under uncertainty in a multi-agent, turn-based environment. The project models a small system of interacting agents that must balance immediate utility against the expected value of waiting for a more favorable state. It is intentionally minimal, readable, and extensible, making it suitable for experimentation with probabilistic reasoning, strategic timing, and agent behavior.

The simulation is framed as a controlled model for evaluating how simple decision heuristics perform under varying conditions of risk, information asymmetry, and opportunity cost. Rather than emphasizing gameplay, the system is organized as a research-style prototype for exploring the dynamics of threshold-based choice under stochastic constraints.

## Overview

The model examines a four-agent scenario in which each participant is assigned two values from a fixed numerical range. At each decision point, an agent evaluates whether to commit a currently usable value or defer in the hope of obtaining a more advantageous outcome later. The simulation compares each agent's actual decision against a probabilistic estimate of expected payoff.

The interface supports direct inspection of the decision process:

- each agent is treated as an autonomous decision-maker
- action selection is guided by a simple probabilistic heuristic
- the user can compare personal choice against the model's risk estimate
- outcomes are summarized at the end of the run to reveal the distribution of accepted and deferred actions

## Research focus

This project explores several themes relevant to mathematical and behavioral modeling:

- decision-making under uncertainty
- expected value estimation in bounded-rational systems
- sequential choice under stochastic constraints
- comparison between heuristic and optimized action policies
- emergent outcomes from repeated local decisions

The prototype is designed to make these dynamics legible without imposing heavy implementation overhead or complex infrastructure. It is intended as a lightweight experimental platform for testing strategy, risk sensitivity, and parameter variation.

## Live demo

[Open the interactive simulation](https://codepen.io/matteospano/details/emBJPEg)

## Project structure

- `main.HTML` – application entry point and simulation interface
- `functions.TS` – state model, card generation logic, simulation loop, and agent policy logic
- `style.css` – visual styling and layout

## Running locally

Because this is a lightweight static prototype, it can be served with any simple local web server:

```bash
cd /workspaces/mind-number-guess
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/main.HTML
```

## Notes

This project is best understood as an experimental simulation environment rather than a conventional end-user application. It prioritizes clarity, rapid iteration, and conceptual transparency over production polish. The design is intentionally compact, making it easy to extend with alternative heuristic models, additional constraints, or richer analytical outputs.

The implementation is structured to support further investigation into probabilistic decision dynamics, strategic timing, and multi-agent choice behavior in a compact computational setting.

# Work Rhythm PWA — Philosophy & Design Intent

## Purpose

This application is a **time observer**, not a productivity tool.

Its sole purpose is to simulate the *rhythm* of a normal workday
(meetings, focus blocks, breaks) without requiring the user to do any work,
take any action, or make any decisions.

The app exists to help users mentally re-acclimate to workplace time structure
after extended absence (vacation, leave, illness, burnout).

If the app ever feels like it is asking something of the user, it is wrong.

---

## Core Mental Model

**This app is a clock.**

- A clock does not ask to be started.
- A clock does not track progress.
- A clock does not congratulate or warn.
- A clock simply reflects the current moment.

This app reflects *what kind of workplace time it is right now*.

---

## Non-Negotiable Principles

### 1. Strictly Time-Reactive
- The app observes wall-clock time (`Date`).
- It never advances, completes, or progresses anything.
- There is no concept of “done”, “remaining”, or “missed”.

### 2. Stateless Simulation
- The schedule is deterministic per calendar date.
- No schedule, progress, or history is stored.
- Closing and reopening the app simply shows “now”.

### 3. Stable Day
- A given day’s schedule never changes mid-day.
- No randomness that can surprise or confuse the user.

### 4. No User Obligation
- No required taps.
- No confirmations.
- No actions.
- Seeing a screen with text and nothing to do is **correct behavior**.

### 5. Calm by Absence
- Calm is achieved by *removing* features, not adding them.
- Silence, stillness, and passivity are intentional UX choices.

---

## What the App Is NOT

The app must never become:

- A productivity tool
- A task manager
- A habit tracker
- A coaching app
- A journaling app
- A motivational app
- A gamified system
- A data collection tool

If any of the following appear, the philosophy has been violated:

- Progress bars
- Timers or countdowns
- “Time remaining”
- Streaks or scores
- Charts or trends
- Daily summaries
- Performance language
- Notifications that demand attention

---

## First-Load Behavior (Important)

On first load, the app immediately displays the current activity
(e.g., “Team Sync”, “Focus”, “Lunch”).

There is:
- No welcome screen
- No onboarding
- No explanation
- No call to action

This is intentional.

The user is not starting something.
They are stepping into time that already exists.

---

## Design Success Criteria

The app is successful if:

- The user does nothing.
- The screen changes quietly over time.
- The app fades into the background.
- The user eventually stops needing it.

Dependency is failure.

---

## Enhancement Guardrails

Post-MVP enhancements are allowed **only if** they preserve:

- Statelessness
- Determinism
- Passivity
- Privacy
- Calm tone

Safe enhancements adjust the *shape of time* (e.g., workday hours),
not the *meaning of time*.

If an enhancement creates pressure, guilt, urgency, or attachment,
it must not be implemented.

---

## Final Test (For Humans and AI)

Before adding or changing anything, ask:

1. Does this still feel like a clock?
2. Would a burnt-out person feel safer or worse?
3. Would this create guilt if ignored?

If any answer is negative, do not proceed.

---

## Instruction to AI Assistants (Gemini, etc.)

When working on this codebase:

- Prefer removal over addition.
- Prefer simplicity over cleverness.
- Prefer predictability over realism.
- Never “improve engagement”.
- Never add features that ask for attention.

The absence of interaction is the feature.

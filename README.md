# Work Rhythm


<p align="left">
  <a href="https://github.com/jzfdav/work-rhythm/actions/workflows/deploy.yml">
    <img src="https://github.com/jzfdav/work-rhythm/actions/workflows/deploy.yml/badge.svg" alt="Deploy to GitHub Pages">
  </a>
  <a href="https://github.com/jzfdav/work-rhythm/actions/workflows/test.yml">
    <img src="https://github.com/jzfdav/work-rhythm/actions/workflows/test.yml/badge.svg" alt="Playwright Tests">
  </a>
  <a href="https://github.com/jzfdav/work-rhythm/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/jzfdav/work-rhythm?style=flat-square" alt="License MIT">
  </a>
</p>

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white" alt="Biome" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

A calm, passive, clock-like PWA built to help professionals transition back into the rhythm of workplace life. Optimized for high-end Android hardware (OnePlus 13).

## 🕰️ Philosophy & Purpose

**This is not a game.**

Work Rhythm is a **re-entry companion** for professionals returning to the workplace after a long leave of absence—whether it’s a vacation, parental leave, recovery, or a career break.

Re-adjusting to the rigid structure, recurring meetings, and mental tempo of a workday can be a jarring experience. This app bridges that gap by providing a **low-stakes, simulated workplace environment** that helps re-calibrate your internal clock.

- **Mental Re-calibration**: Simulated meetings and tasks help set your mind for a structured day, easing the transition from absolute freedom back to a regular schedule.
- **No Guilt, No Score**: Unlike games, there is no "winning" or "losing". Miss a meeting? That's fine. Ignore the app for hours? Also fine. The goal is simply to be *present* with the rhythm.
- **Calm by Default**: Language is neutral ("Urgent Task" instead of "Firefighting"). Dark mode is default. Interactions are fluid and quiet.

## ✨ Features

- **Chrono-Dynamic Background**: Procedural mesh gradients that evolve minute-by-minute.
- **Dynamic Agenda**: Unique daily schedules generated with diverse "flavors" (Collaborative, Focused, etc.).
- **Workload Balance**: Visualizes the varying intensity of a workday.
- **Custom Projects**: Set your own "Project Name" in settings to ground the simulation in your reality.
- **Contextual Help**: Integrated philosophy and definitions (tap 'i' icons) to explain the *meaning* of each activity.
- **Physical Depth & Sheen**: Multi-layered Benthal shadows and inner highlights for a tactile hardware feel.
- **Adaptive Variable Typography**: Living text transitions utilizing the full Inter Variable axis.
- **Horological Precision**: Synchronized timers and a high-precision progress line.
- **Handheld Ergonomics**: All tertiary controls optimized for the "Thumb Zone".
- **Advanced PWA**: Edge-to-edge immersion with dynamic system-level theme-color syncing.

## 🔒 Privacy & Data

**Zero Telemetry. 100% Offline.**

We believe that your recovery and work habits are private.
- **No Analytics**: We do not track how you use the app.
- **No Cloud**: All data lives in your browser's `localStorage`.
- **Data Sovereignty**: You can **Export** your data to JSON or **Reset Everything** at any time from the Settings menu.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run Playwright tests
npx playwright test
```

## 🛠 Tech Stack

- **Core**: React 18, Vite, TypeScript
- **Styling**: Vanilla CSS (Custom Variable Layout), Framer Motion
- **Tooling**: Biome (Lint/Format), Playwright (Testing)
- **Deployment**: GitHub Actions + GitHub Pages

---

*Built by [JZFDAV](https://github.com/jzfdav)*

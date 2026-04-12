# Infant Physical Exam Study Reference

[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://pedscoffee.github.io/infantexamstudy/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **Educational draft.** This chart is a work in progress and may contain errors. It is still in its "infancy." Use clinical judgment, verify with trusted references, and treat it as supplemental material.

A searchable, single-page quick reference for the newborn physical exam — covering findings, management, and board pearls across 16 body systems. Designed for medical students starting pediatrics rotations and residents studying for boards.

**[Open the chart →](https://pedscoffee.github.io/infantexamstudy/)**

## Features

### Quick Reference Chart
Browse findings organized by body system (Vitals, Head, Eyes, Ears, Nose, Mouth, Neck, Chest/Resp, Cardiovascular, Abdomen, GU, MSK, Spine, Skin, Neuro). Each row includes the finding name, management/next steps, board pearls, and links to image references. High-priority findings are flagged in red.

### Search
Instantly filter across all sections by finding name, management keywords, or pearl content.

### Mastery Tracking
Mark each finding as Not Started, Reviewing, or Learned using the mastery dots. A progress bar tracks your overall progress, and filter pills let you focus on specific mastery levels.

### Study Mode
Hide the Management and/or Board Pearl columns, then reveal them one at a time to practice active recall. Use the floating navigation bar to step through findings, shuffle the order, or skip rows you've already learned.

### Tutor Mode
A built-in quiz coach that pulls random findings and prompts you with management or pearl recall questions. Filter by mastery level or high-priority rows to focus your practice.

### Edit Mode
Modify findings, management notes, pearls, and section normals directly in the browser. Changes auto-save to localStorage. Use the Export button to bake your edits into a standalone HTML file with its own localStorage namespace.

## Getting Started

1. **Open the chart**: Visit the [live site](https://pedscoffee.github.io/infantexamstudy/) or open `index.html` directly in your browser — no build step or dependencies required.
2. **Study**: Click **Study Mode** to hide columns and practice recall. Use the floating bar to navigate.
3. **Track progress**: Click the mastery dot beside each finding to cycle through Not Started → Reviewing → Learned.
4. **Quiz yourself**: Open **Tutor Mode** for randomized questions with chart-based answers.
5. **Edit**: Toggle **Edit Mode** to modify content in-place. Export to save your edits into a new HTML file.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

- 💬 [Suggest improvements on the Discussions page](https://github.com/pedscoffee/infantexamstudy/discussions/1)
- 🐛 [Report bugs via Issues](https://github.com/pedscoffee/infantexamstudy/issues)
- 🔀 [Submit a pull request](https://github.com/pedscoffee/infantexamstudy/pulls)

## Technical Notes

- All data, styles, and logic live in a single `index.html` file for maximum portability.
- Edits and mastery progress are stored in `localStorage`, keyed by a `DATA_ID` constant that changes on each export to prevent stale data conflicts.
- No external dependencies beyond Google Fonts (with system-font fallbacks).
- Keyboard shortcuts: `Esc` exits study mode; `←`/`→` arrows navigate between findings.

## License

This project is licensed under the [MIT License](LICENSE).

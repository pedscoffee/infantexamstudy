# Infant Physical Exam Study Reference

[Infant Exam Study Guide](https://pedscoffee.github.io/infantexamstudy/)

This chart is a work in progress and likely contains errors as we are just getting started. It is still in its "infancy". Use clinical judgment, verify with trusted references, and treat it as supplemental material.  The current goal is for this to serve as a proof of concept, but with community contributions this could transform overtime into a valuable resource, especially for students starting pediatrics rotations or residents studying for boards.  

Please contribute! Suggestions for additions or improvements welcome on the discussions page.  

This single-page chart is a searchable, editable quick reference for the newborn physical exam. All data lives in `index.html`; styles, markup, and the data array are bundled together so you can open the file directly in a browser.

## Key features
- **Search, mastery, and study helpers.** Search the table, mark rows as not started/reviewing/learned, and filter by state with the pill buttons. Study mode blurs management/board pearl cells until you click their inline reveal buttons.
- **Study mode toggle.** Click the study button in the sticky header to open the column-hiding popover; start a session to hide Management, Pearl, or both columns and reveal cells individually. Clicking the study button while already studying exits the session.
- **In-place editing.** Toggle edit mode to modify findings, management notes, pearls, and section normals in the DOM. Changes auto-save to your browser, and the export button bakes them into a standalone HTML file with a unique localStorage namespace so stale edits no longer interfere.

## Workflow
1. Open `index.html` in your browser (no build step required).
2. Toggle **Edit Mode** to make text editable; edits are saved automatically and can be exported via the **Export File** button.
3. Use **Study Mode** to practice: select which columns to hide, click the inline reveal buttons to show only the cell you care about, and use the floating bar for navigation and skipping learned rows.

## Development notes
- Local storage now keys edits and mastery data by a `DATA_ID` constant that is rewritten on each export, preventing old exports from clobbering fresh charts.
- Inline reveal buttons now add a `cell-revealed` class so only the clicked cell is unblurred; the row class still tracks whether anything has been revealed for quick-mark controls.

## WebLLM + Gemma 4 tutor setup
1. Use a Chromium-based browser that exposes WebGPU with `shader-f16` support; the loader at `webllm/loader.js` dynamically imports `https://esm.run/@mlc-ai/web-llm`, so no bundler is required but keep a fast connection during the first download. citeturn3search5
2. Download the `welcoma/gemma-4-E2B-it-q4f16_1-MLC` package (it already ships with `release-manifest.json`, the WebGPU library, tokenizer, and the quantized shards) and unpack it under `webllm/models/gemma-4-E2B-it-q4f16_1-MLC`. That repo is targeted at in-browser WebLLM inference and figures into the loader’s default config. citeturn1search1
3. If you host the model assets somewhere else, set `window.GEMMA4_MODEL_ROOT` before the loader script runs so it can build the correct app config; `index.html` already initializes the global to the `webllm/models/...` path near the bottom of the page.
4. Customize `window.GEMMA4_SYSTEM_PROMPT` to change Gemma’s persona (the default prompt asks it to stay concise and reference the chart as its single source of truth).
5. Reload the page, click “New question,” and let the tutor panel confirm that `window.gemmaTutorStatus` reaches “Gemma 4 ready (WebLLM)”; `window.gemmaTutorReady` resolves once the engine finishes loading, and “Ask Gemma for feedback” becomes actionable once the toolkit completes its download.

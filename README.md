# Newborn Exam Quick Reference

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

# Remove Sidebar Feature

## Goal
Remove the screen selector sidebar panel from the presentation simulator and keep only the centered, fully interactive mobile emulator, improving presentation pitch quality and aligning the site with a real mobile experience.

## Tasks
- [x] Task 1: Create and switch to a dedicated branch named `feature/remove-sidebar` → Verify: Run `git branch` and see active branch.
- [x] Task 2: Hide sidebar and style the subtle floating reset button in CSS → Verify: CSS contains `.sidebar { display: none !important; }` and `.floating-reset-btn`.
- [x] Task 3: Remove `<aside class="sidebar">` from HTML and append the floating reset button → Verify: Inspect `index.html` structure.
- [x] Task 4: Run the verify checks to ensure no regressions or errors occur → Verify: `python .agent/scripts/checklist.py .` returns success.

## Done When
- [x] Sidebar is completely removed from view.
- [x] Interactive mobile device is perfectly centered on the screen.
- [x] A subtle, beautiful floating reset button exists in the corner for easy pitch presenting.
- [x] No Javascript or styling console errors are present.

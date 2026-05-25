# Plan: Fix Keyboard Tab Focus on Hidden Call Toast Overlay & Remove Pre-configured Caregiver

## Goal
1. Fix the accessibility bug where the simulated emergency call overlay (`#phone-toast-call`) is focusable via keyboard Tab navigation even when hidden.
2. Remove all pre-configured references to "Marcos" (Cuidador) in the codebase, starting with a clean slate for the emergency contact and simulation interface.

## Tasks
- [ ] Task 1: Add `visibility: hidden` to `.toast-call` in `css/styles.css` to prevent tab navigation when inactive. → Verify: View `css/styles.css` changes.
- [ ] Task 2: Add `visibility: visible` and transition for `visibility` to `.toast-call.active` in `css/styles.css`. → Verify: View CSS changes.
- [ ] Task 3: Remove pre-configured `Marcos` references in `index.html` (line 1530-1532) and replace with generic "Contato de Emergência". → Verify: View `index.html` changes.
- [ ] Task 4: Replace Marcos hardcoded values in `js/main.js` calling simulator function with dynamic/generic "Contato de Emergência" and telephone icon. → Verify: View `js/main.js` changes.
- [ ] Task 5: Test and manually verify tab navigation in the browser to ensure the call toast is no longer focusable when hidden. → Verify: Test keyboard focus workflow.

## Done When
- Keyboard tab navigation passes through all screen options seamlessly without focusing the hidden call toast (`#phone-toast-call`) or its hang-up button.
- The toast remains fully functional and smoothly animates into view when a call is actually triggered.
- All pre-populated caregiver names ("Marcos") and avatars are completely replaced with clean, generic, dynamic placeholders.

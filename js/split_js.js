const fs = require('fs');
const path = require('path');

const mainJsPath = path.join(__dirname, 'main.js');
let lines = fs.readFileSync(mainJsPath, 'utf8').split('\n');

// Remove DOMContentLoaded wrapper (first and last line)
if (lines[0].includes('DOMContentLoaded')) {
  lines.shift(); // remove first line
}
if (lines[lines.length - 1].includes('});') || lines[lines.length - 2].includes('});')) {
  lines.pop(); // remove empty line
  if (lines[lines.length - 1].includes('});')) {
    lines.pop(); // remove });
  }
}

// Remove 2-space indentation
lines = lines.map(line => line.startsWith('  ') ? line.substring(2) : line);

// Boundaries based on the line numbers of '===...' comments
// The line numbers were based on the original file. Since we removed line 1, we offset by 1.
// Original lines:
// 82: APP STATE (but actually code starts earlier)
// 395: SCREEN 6 DATABASE
// 845: DYNAMIC PATIENT RENDERING
// 1073: ONBOARDING FLOW
// 1720: EMERGENCY CALL (Patient features)
// 1996: BOTTOM NAVIGATION & NEW FEATURES (App logic)

const getBlock = (start, end) => lines.slice(start - 2, end ? end - 2 : undefined).join('\n');

// Note: lines array is 0-indexed. Original line 2 is lines[0] now.
// Block 1 (State): 2 to 394 -> lines[0] to lines[392]
const stateContent = getBlock(2, 395);
const routerContent = getBlock(395, 845);
const caregiverContent = getBlock(845, 1073);
const onboardingContent = getBlock(1073, 1720);
const patientContent = getBlock(1720, 1996);
const appContent = getBlock(1996);

fs.writeFileSync(path.join(__dirname, 'state.js'), stateContent);
fs.writeFileSync(path.join(__dirname, 'router.js'), routerContent);
fs.writeFileSync(path.join(__dirname, 'caregiver.js'), caregiverContent);
fs.writeFileSync(path.join(__dirname, 'onboarding.js'), onboardingContent);
fs.writeFileSync(path.join(__dirname, 'patient.js'), patientContent);
fs.writeFileSync(path.join(__dirname, 'app.js'), appContent);

console.log('JS successfully modularized!');

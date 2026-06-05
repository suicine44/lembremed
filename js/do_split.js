const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'app.js');
const onboardingPath = path.join(__dirname, 'onboarding.js');

const appLines = fs.readFileSync(appPath, 'utf8').split('\n');
const onboardingLines = fs.readFileSync(onboardingPath, 'utf8').split('\n');

function extractBlock(lines, startMarker, endMarker) {
  const startIdx = lines.findIndex(l => l.includes(startMarker));
  let endIdx = endMarker ? lines.findIndex((l, idx) => idx > startIdx && l.includes(endMarker)) : lines.length;
  if (endIdx === -1) endIdx = lines.length;
  if (startIdx === -1) return '';
  // Since the section headers are like "// ====", we step back one line to include the header itself if it exists
  let actualStart = startIdx;
  if (actualStart > 0 && lines[actualStart - 1].startsWith('// ====')) {
    actualStart = actualStart - 1;
  }
  let actualEnd = endIdx;
  if (actualEnd < lines.length && lines[actualEnd - 1] === '') {
    actualEnd = actualEnd - 1; // Don't grab trailing newlines
  }
  return lines.slice(actualStart, actualEnd).join('\n');
}

// Split app.js
const navContent = extractBlock(appLines, 'BOTTOM NAVIGATION ROUTING', 'NEW FEATURES IMPLEMENTATION');
const alertsAgendaContent = extractBlock(appLines, 'NEW FEATURES IMPLEMENTATION', 'TASK 4: REAL-TIME');
const emergencyContent = extractBlock(appLines, 'TASK 4: REAL-TIME', 'DEMO PITCH MODE SHORTCUTS');
const shortcutsContent = extractBlock(appLines, 'DEMO PITCH MODE SHORTCUTS', null);

fs.writeFileSync(path.join(__dirname, 'navigation.js'), navContent);
fs.writeFileSync(path.join(__dirname, 'alerts.js'), alertsAgendaContent);
fs.writeFileSync(path.join(__dirname, 'emergency.js'), emergencyContent);
fs.writeFileSync(path.join(__dirname, 'shortcuts.js'), shortcutsContent);

// Split onboarding.js
const regContent = extractBlock(onboardingLines, 'ONBOARDING FLOW ROUTING UPDATES', 'Screen 4 (Welcome) -> Screen 5 (Search)');
const medSearchContent = extractBlock(onboardingLines, 'Screen 4 (Welcome) -> Screen 5 (Search)', 'Phase 2: iOS Time Picker');
const timePickerContent = extractBlock(onboardingLines, 'Phase 2: iOS Time Picker', null);

fs.writeFileSync(path.join(__dirname, 'registration.js'), regContent);
fs.writeFileSync(path.join(__dirname, 'medSearch.js'), medSearchContent);
fs.writeFileSync(path.join(__dirname, 'timePicker.js'), timePickerContent);

// Delete the old files to enforce the new modular architecture
fs.unlinkSync(appPath);
fs.unlinkSync(onboardingPath);

console.log('Split successful');

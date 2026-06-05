const fs = require('fs');
const vm = require('vm');

function loadFiles() {
  const scripts = [
    'components.js',
    'state.js',
    'router.js',
    'onboarding.js',
    'caregiver.js',
    'patient.js',
    'app.js'
  ];

  const window = {};
  const document = {
    addEventListener: () => {},
    getElementById: () => ({ addEventListener: () => {}, classList: { add: () => {}, remove: () => {} }, style: {}, setAttribute: () => {}, removeAttribute: () => {}, appendChild: () => {}, contains: () => false, querySelector: () => ({ style: {}, querySelector: () => ({ style: {} }) }) }),
    querySelector: () => ({ addEventListener: () => {}, classList: { add: () => {}, remove: () => {} }, style: {}, setAttribute: () => {}, getAttribute: () => '', appendChild: () => {}, contains: () => false, querySelector: () => ({ style: {}, querySelector: () => ({ style: {} }) }) }),
    querySelectorAll: () => [{ addEventListener: () => {}, classList: { add: () => {}, remove: () => {} }, style: {}, setAttribute: () => {}, getAttribute: () => '', appendChild: () => {}, contains: () => false, querySelector: () => ({ style: {}, querySelector: () => ({ style: {} }) }) }],
    body: { classList: { add: () => {}, remove: () => {} } }
  };
  const localStorage = { getItem: () => null, setItem: () => {} };

  const context = vm.createContext({
    window,
    document,
    localStorage,
    console,
    Math,
    Date,
    parseInt,
    isNaN,
    setTimeout,
    setInterval
  });

  try {
    for (const file of scripts) {
      console.log(`Loading ${file}...`);
      const content = fs.readFileSync(`./js/${file}`, 'utf8');
      vm.runInContext(content, context);
    }
    console.log('All scripts loaded successfully without ReferenceErrors.');
  } catch (e) {
    console.error(`Error:`, e);
  }
}

loadFiles();

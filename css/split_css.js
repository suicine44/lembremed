const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'styles.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

// The new files structure
const themePath = path.join(__dirname, 'theme', 'theme.css');
const layoutPath = path.join(__dirname, 'layout', 'layout.css');
const componentsPath = path.join(__dirname, 'components', 'components.css');
const utilitiesPath = path.join(__dirname, 'utilities', 'utilities.css');

// Let's divide by searching for specific comment markers
const blocks = {
  theme: [],
  layout: [],
  components: [],
  utilities: [],
  screens: []
};

let currentBlock = 'theme'; // Initial state

const lines = cssContent.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('/* Simulator Dashboard Structure */') || line.includes('/* Physical Phone Container Frame */')) {
    currentBlock = 'layout';
  } else if (line.includes('/* Reusable UI Components */')) {
    currentBlock = 'components';
  } else if (line.includes('/* SPECIFIC SCREEN DESIGNS */')) {
    currentBlock = 'screens';
  } else if (line.includes('/* Utilities */') || line.includes('/* ESTILOS DE CONTORNO DE FOCO ACESSÍVEL') || line.includes('/* ESTILOS DE CONTORNO DE FOCO ACESSVEL') || line.includes('/* Acessibility')) {
    currentBlock = 'utilities';
  }
  
  // A few overrides
  if (line.includes('.icon {')) {
    currentBlock = 'utilities';
  }
  if (line.includes('.sr-only {')) {
    currentBlock = 'utilities';
  }
  
  // Accumulate lines
  if (currentBlock === 'theme') blocks.theme.push(line);
  if (currentBlock === 'layout') blocks.layout.push(line);
  if (currentBlock === 'components') blocks.components.push(line);
  if (currentBlock === 'utilities') blocks.utilities.push(line);
  if (currentBlock === 'screens') blocks.screens.push(line);
}

// We need to keep screens in styles.css or move them to screens.css
// But for now let's write the parts
fs.writeFileSync(themePath, blocks.theme.join('\n'));
fs.writeFileSync(layoutPath, blocks.layout.join('\n'));
fs.writeFileSync(componentsPath, blocks.components.join('\n'));
fs.writeFileSync(utilitiesPath, blocks.utilities.join('\n'));

// Replace styles.css with just the imports and screens
const newStylesContent = `
/* LembreMed - CSS Modular Entry Point */
@import url('theme/theme.css');
@import url('layout/layout.css');
@import url('components/components.css');
@import url('utilities/utilities.css');

${blocks.screens.join('\n')}
`;

fs.writeFileSync(cssPath, newStylesContent.trim() + '\n');
console.log('CSS successfully modularized!');

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Replace common inline styles with utility classes
const replacements = [
  { search: /style="display: none;"/g, replace: 'class="d-none"' },
  { search: /class="error-text" role="alert" style="display: none;"/g, replace: 'class="error-text d-none" role="alert"' },
  { search: /style="margin-top: auto;"/g, replace: 'class="mt-auto"' },
  { search: /style="margin-bottom: (\d+)px;"/g, replace: 'class="mb-$1"' },
  { search: /style="margin-top: (\d+)px;"/g, replace: 'class="mt-$1"' },
  { search: /style="color: var\(--color-danger-text\);"/g, replace: 'class="text-danger"' },
  { search: /class="required" aria-hidden="true" style="color: var\(--color-danger-text\);"/g, replace: 'class="required text-danger" aria-hidden="true"' },
  { search: /style="font-size: (\d+)px;"/g, replace: 'class="text-size-$1"' },
  { search: /style="color: var\(--color-text-muted\);"/g, replace: 'class="text-muted"' },
  { search: /style="display: flex; align-items: center; gap: (\d+)px;"/g, replace: 'class="d-flex align-center gap-$1"' },
  { search: /style="display: flex; flex-direction: column; gap: (\d+)px;"/g, replace: 'class="d-flex flex-col gap-$1"' }
];

replacements.forEach(({search, replace}) => {
  htmlContent = htmlContent.replace(search, replace);
});

// Clean up duplicate classes created by regex (e.g. class="foo" class="bar")
htmlContent = htmlContent.replace(/class="([^"]+)"\s+class="([^"]+)"/g, 'class="$1 $2"');
htmlContent = htmlContent.replace(/class="([^"]+)"\s+class="([^"]+)"/g, 'class="$1 $2"'); // run twice for triple classes

fs.writeFileSync(htmlPath, htmlContent);

// Add utility classes to utilities.css
const utilsPath = path.join(__dirname, 'utilities', 'utilities.css');
const utilsCSS = `
/* Spacing Utilities */
.mt-auto { margin-top: auto !important; }
.mt-8 { margin-top: 8px !important; }
.mt-16 { margin-top: 16px !important; }
.mt-24 { margin-top: 24px !important; }
.mt-32 { margin-top: 32px !important; }

.mb-4 { margin-bottom: 4px !important; }
.mb-8 { margin-bottom: 8px !important; }
.mb-12 { margin-bottom: 12px !important; }
.mb-16 { margin-bottom: 16px !important; }
.mb-20 { margin-bottom: 20px !important; }
.mb-24 { margin-bottom: 24px !important; }
.mb-32 { margin-bottom: 32px !important; }

/* Display & Flex */
.d-none { display: none !important; }
.d-flex { display: flex !important; }
.flex-col { flex-direction: column !important; }
.align-center { align-items: center !important; }
.justify-between { justify-content: space-between !important; }
.gap-4 { gap: 4px !important; }
.gap-8 { gap: 8px !important; }
.gap-10 { gap: 10px !important; }
.gap-12 { gap: 12px !important; }
.gap-16 { gap: 16px !important; }

/* Text Utilities */
.text-danger { color: var(--color-danger-text) !important; }
.text-primary { color: var(--color-primary) !important; }
.text-muted { color: var(--color-text-muted) !important; }
.text-dark { color: var(--color-text-dark) !important; }
.text-size-11 { font-size: 11px !important; }
.text-size-12 { font-size: 12px !important; }
.text-size-13 { font-size: 13px !important; }
.text-size-14 { font-size: 14px !important; }
.text-size-16 { font-size: 16px !important; }
.text-size-18 { font-size: 18px !important; }
.text-size-22 { font-size: 22px !important; }
.text-size-24 { font-size: 24px !important; }
.font-bold { font-weight: 700 !important; }
.font-extrabold { font-weight: 800 !important; }
`;

fs.appendFileSync(utilsPath, utilsCSS);

console.log('Inline styles replaced with utilities!');

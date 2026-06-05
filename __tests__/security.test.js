// Mock DOM environment is provided by jest-environment-jsdom

// We need to load components.js to test Components.escapeHTML
const fs = require('fs');
const path = require('path');
const componentsCode = fs.readFileSync(path.resolve(__dirname, '../js/components.js'), 'utf8');
const vm = require('vm');
const context = vm.createContext({ global: global });
vm.runInContext(componentsCode + '; global.Components = Components;', context);

describe('Security: XSS Prevention', () => {
  test('Components.escapeHTML should escape dangerous characters', () => {
    const maliciousInput = '<script>alert("xss & vulnerability")</script>';
    const escaped = Components.escapeHTML(maliciousInput);
    
    expect(escaped).not.toContain('<script>');
    expect(escaped).not.toContain('</script>');
    expect(escaped).toContain('&lt;script&gt;');
    expect(escaped).toContain('&amp;');
    expect(escaped).toContain('&quot;');
  });

  test('Components.escapeHTML should handle null or undefined', () => {
    expect(Components.escapeHTML(null)).toBe('');
    expect(Components.escapeHTML(undefined)).toBe('');
  });
});

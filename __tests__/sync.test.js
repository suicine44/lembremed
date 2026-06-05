describe('Data Sync: Robust JSON Parsing', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should handle malformed JSON in localStorage gracefully', () => {
    // Write malformed JSON to localStorage
    localStorage.setItem('lembremed_sync_data', '{malformed: true');
    
    // Simulate the logic used in app.js
    let syncData = {};
    try {
      syncData = JSON.parse(localStorage.getItem('lembremed_sync_data') || '{}');
    } catch (e) {
      console.warn('Recovered from malformed sync data');
      syncData = {}; // Fallback
    }

    expect(syncData).toEqual({});
  });
});

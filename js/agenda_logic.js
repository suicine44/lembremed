window.AgendaLogic = {
  calculateDailyProgress: function(medsArray) {
    if (!medsArray || medsArray.length === 0) return { taken: 0, total: 0, progress: 0 };
    const total = medsArray.length;
    const taken = medsArray.filter(m => m.status === 'tomado').length;
    const progress = Math.round((taken / total) * 100);
    return { taken, total, progress };
  },
  
  countDelayedMeds: function(medsArray) {
    if (!medsArray) return 0;
    return medsArray.filter(m => m.status === 'atrasado').length;
  }
};

// For Node.js/Jest environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.AgendaLogic;
}

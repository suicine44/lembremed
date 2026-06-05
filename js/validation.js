window.Validation = {
  isValidName: function(name) {
    return typeof name === 'string' && name.trim().length > 0;
  },
  
  isValidPhone: function(phone) {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 11;
  },
  
  maskPhone: function(value) {
    if (!value) return "";
    let x = value.replace(/\D/g, '');
    if (x.length === 0) {
      return '';
    } else if (x.length <= 2) {
      return '(' + x;
    } else if (x.length <= 6) {
      return '(' + x.substring(0, 2) + ') ' + x.substring(2);
    } else if (x.length <= 10) {
      return '(' + x.substring(0, 2) + ') ' + x.substring(2, 6) + '-' + x.substring(6);
    } else {
      return '(' + x.substring(0, 2) + ') ' + x.substring(2, 7) + '-' + x.substring(7, 11);
    }
  }
};

// For Node.js/Jest environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.Validation;
}

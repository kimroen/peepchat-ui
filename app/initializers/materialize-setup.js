/* globals window:true */
export function initialize(/* application */) {
  if (window && window.validate_field) {
    // Disables materialize's built-in validation
    window.validate_field = function() {};
  }
}

export default {
  name: 'materialize-setup',
  initialize
};

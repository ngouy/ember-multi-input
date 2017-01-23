import Ember from 'ember';

const { A, Controller } = Ember;

export default Controller.extend({

  inputs3: A(['test@test.com']),
  inputs2: A(),

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  actions: {
    validation(email) {
      if (!this.validateEmail(email)) { return  "invalid_format"; }
      // if (this.get('existingEmail').indexOf(email) !== -1) { return "already_taken" }
      return null;
    },
  }
});
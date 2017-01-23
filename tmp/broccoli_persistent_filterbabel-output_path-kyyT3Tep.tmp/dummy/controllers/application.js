define("dummy/controllers/application", ["exports", "ember"], function (exports, _ember) {
  var Controller = _ember["default"].Controller;
  var computed = _ember["default"].computed;
  exports["default"] = Controller.extend({

    validateEmail: function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    actions: {
      validation: function validation(email) {
        if (!this.validateEmail(email)) {
          return "invalid_format";
        }
        // if (this.get('existingEmail').indexOf(email) !== -1) { return "already_taken" }
        return null;
      }
    }
  });
});
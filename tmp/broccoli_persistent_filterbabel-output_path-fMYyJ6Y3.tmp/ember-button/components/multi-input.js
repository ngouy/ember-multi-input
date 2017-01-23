define('ember-button/components/multi-input', ['exports', 'ember', 'ember-button/templates/components/multi-input'], function (exports, _ember, _emberButtonTemplatesComponentsMultiInput) {
  'use strict';

  var computed = _ember['default'].computed;
  var alias = _ember['default'].computed.alias;
  var observer = _ember['default'].observer;
  var set = _ember['default'].set;
  var A = _ember['default'].A;
  var Component = _ember['default'].Component;

  exports['default'] = Component.extend({

    layout: _emberButtonTemplatesComponentsMultiInput['default'],
    validation: false,
    type: null,
    uniqness: true,
    max: null,
    onEnter: true,
    onSpace: true,
    onAction: false,
    clearOnBlur: false,
    alwaysShowPlaceholder: false,
    mustValidate: false,

    _current_input: '',
    _prev_serach_length: alias('_current_input.length'),
    _inputsNumber: alias('inputs.length'),

    inputPlaceholder: computed('placeholder', 'alwaysShowPlaceholder', function () {
      return this.get('alwaysShowPlaceholder') ? this.get('placeholder') : this.get('_inputsNumber') === 0 ? this.get('placeholder') : '';
    }),

    i18nObserver: observer('i18n', function () {
      var _this = this;

      this.get('i18n');
      this.get('errors').each(function (error) {
        return set(error, 'full_message', _this._get_message_error(error.label));
      });
    }),

    _get_message_error: function _get_message_error(label) {
      var error_path = this.get('error_path'),
          i18n = this.get('i18n');
      var full_message = undefined;
      if (i18n) {
        full_message = this.get('i18n').t('' + (error_path ? error_path + '.' : '') + label);
      } else {
        switch (label) {
          case 'many_errors':
            full_message = 'there are many errors on one or more inputs';
            break;
          case 'already_taken':
            full_message = 'this input is already used';
            break;
          case 'invalid_format':
            full_message = 'your input format is not valid';
            break;
          default:
            full_message = 'unkonwn error';
            break;
        }
      }
      return full_message;
    },

    _display_error: function _display_error(label, value) {
      this.set('display_error', true);
      var full_message = this._get_message_error(label);
      this.set('error', {
        label: label,
        value: value,
        full_message: full_message
      });
    },

    _set_input_value: function _set_input_value(value) {
      this.$('input')[0].value = value;
      this.set('_current_input', value);
    },

    _extract_values_from_input: function _extract_values_from_input() {
      var value = this.$('input')[0].value;
      return value.split(' ').filter(function (a) {
        return a.trim().length > 0;
      });
    },

    _try_set_new_inputs: function _try_set_new_inputs() {
      var _this2 = this;

      var fromPaste = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      var values = this._extract_values_from_input();
      if (fromPaste && values.length <= 1) {
        return;
      }
      var errors = values.map(function (input) {
        if (_this2.get('mustValidate') && _this2.get('validation')(input) || _this2.get('uniqness') && (_this2.get('inputs') || []).includes(input)) {
          return input;
        } else {
          if (!_this2.get('inputs')) {
            _this2.set('inputs', A([input]));
          } else {
            _this2.get('inputs').pushObject(input);
          }
          return null;
        }
      }).filter(function (a) {
        return a;
      });
      var error_input = errors.join(" ");
      if (error_input !== values.join(" ")) {
        this._set_input_value(error_input);
      }
      if (errors.length > 0) {
        this._display_error(errors.length > 1 ? 'many_errors' : this.get('validation')(errors[0]) ? 'invalid_format' : 'already_taken', error_input);
      } else {
        this.set('error', null);
        this._set_input_value("");
      }
    },

    actions: {
      onInput: function onInput(onInputEvent) {
        var prev_length = this.get('_prev_serach_length');
        if ((onInputEvent.srcElement.value || '').length > prev_length + 1) {
          this._try_set_new_inputs(true);
        } else {
          this.set('_current_input', onInputEvent.srcElement.value);
        }
      },

      onBlur: function onBlur() {
        this._try_set_new_inputs();
      },

      onKeydown: function onKeydown(event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
          this._try_set_new_inputs();
          return false;
        }
      }
    }
  });
});
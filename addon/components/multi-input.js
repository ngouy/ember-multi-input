import Ember from 'ember';
import layout from '../templates/components/multi-input';

const { computed, computed: { alias, empty }, observer, set, A, Component } = Ember;

export default Component.extend({

  classNames: ['ember-multi-input'],
  classNameBindings: ['emptyGroup:empty', '_live_error:live-error:min-error'],

  layout,
  validation:            false,
  type:                  null,
  uniqness:              true,
  max:                   null,
  onEnter:               true,
  onSpace:               true,
  onAction:              false,
  clearOnBlur:           false,
  alwaysShowPlaceholder: false,
  mustValidate:          false,

  _current_input:       '',
  _prev_serach_length:  alias('_current_input.length'),
  _inputsNumber:        alias('inputs.length'),
  emptyGroup:           empty('inputs'),

  inputPlaceholder: computed('placeholder', 'alwaysShowPlaceholder', function() {
    return this.get('alwaysShowPlaceholder') ? this.get('placeholder') : (this.get('_inputsNumber') === 0 ? this.get('placeholder') : '');
  }),

  i18nObserver: observer('i18n.locale', function() {
    this.get('i18n.locale');
    const error = this.get('_error');
    set(error, 'full_message', this._get_message_error(error.label));
  }),

  /* observes the input value and display error if there is one */
  inputObserver: observer('_error.value', '_current_input', function() {
    const current_input = this.get('_current_input');
    if (current_input === "" || !current_input) {
      this.set('_error', null);
    }
    const error_value = this.get('_error.value');
    if (error_value) {
      this.set('_live_error', error_value === current_input);
    } else {
      this.set('_live_error', false);
    }
  }),


  _get_message_error(label) {
    const error_path = this.get('errorPath'),
          i18n       = this.get('i18n');
    let full_message;
    if (i18n) {
      full_message = this.get('i18n').t(`${ error_path ? error_path + '.' : ''}${label}`);
    } else {
      switch (label) {
        case 'many_errors':
          full_message = 'there are many errors on one or more inputs';
          break;
        case 'already_taken':
          full_message = 'this input is already used'
          break;
        case 'invalid_format':
          full_message = 'your input format is not valid'
          break
        default:
          full_message = 'unkonwn error'
          break;
      }
    }
    return full_message;
  },

  _display_error(label, value) {
    this.set('_live_error', true);
    const full_message = this._get_message_error(label);
    this.set('_error', {
      label,
      value,
      full_message
    });
  },

  _set_input_value(value) {
    this.$('input')[0].value = value;
    this.set('_current_input', value);
  },

  _extract_values_from_input() {
    let value = this.$('input')[0].value;
    return value.split(' ').filter(a => a.trim().length > 0);
  },

  _try_set_new_inputs(fromPaste = false) {
    const values = this._extract_values_from_input();
    if (fromPaste && values.length <= 1) {
      return;
    }
    let errors = values.map(input => {
      if (this.get('mustValidate') && this.get('validation')(input) || (this.get('uniqness') && (this.get('inputs') || []).includes(input))) {
        return input;
      } else {
        if (!this.get('inputs')){
          this.set('inputs', A([input]));
        } else {
          this.get('inputs').pushObject(input);
        }
        return null;
      }
    }).filter(a => a);
    const error_input = errors.join(" ");
    if (error_input !== values.join(" ")) { this._set_input_value(error_input); }
    if (errors.length > 0) {
      this._display_error(errors.length > 1 ? 'many_errors' : (this.get('validation')(errors[0]) ? 'invalid_format' : 'already_taken'), error_input);
    } else {
      this.set('_error', null);
      this._set_input_value("");
    }
  },

  actions: {
    onInput(onInputEvent) {
      const prev_length = this.get('_prev_serach_length');
      if ((onInputEvent.srcElement.value || '').length > (prev_length + 1)) {
        this._try_set_new_inputs(true);
      } else {
        this.set('_current_input', onInputEvent.srcElement.value);
      }
    },

    onBlur() {
      this._try_set_new_inputs();
    },

    onKeydown(event) {
      if (event.keyCode === 13 || event.keyCode === 32) {
        this._try_set_new_inputs();
        return false;
      }
    },
  },
});
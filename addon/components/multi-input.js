import Ember from 'ember';
import layout from '../templates/components/multi-input';
/* global _ */

const { computed, computed: { alias, and, empty, notEmpty }, observer, set, A, Component } = Ember;

export default Component.extend({

  classNames: ['ember-multi-input'],
  classNameBindings: ['emptyGroup:empty', '_live_error:live-error:min-error', 'hasError'],

  layout,
  inputs:                computed(() => A([])),
  canDeleteInput:        true,
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
  crossOnError:          true,

  _current_input:       '',
  _prev_serach_length:  alias('_current_input.length'),
  _inputsNumber:        alias('inputs.length'),
  emptyGroup:           empty('inputs'),
  showErrorCross:       and('crossOnError', '_error.full_message'),
  hasError:             notEmpty('_error.full_message'),

  inputGroup: computed('inputs.[]', {
    get() {
      return this.get('inputs').mapBy('value');
    },
    set(_, new_values, old_values) {
      if (new_values && !_.isEqual(new_values, old_values)) {
        new_values.forEach(value => {
          this.get('inputs').addObject({ id: Symbol(), value: value });
        });
      }
      return this.get('inputs').mapBy('value');
    },
  }),

  inputPlaceholder: computed('placeholder', '_inputsNumber', 'alwaysShowPlaceholder', function() {
    return this.get('alwaysShowPlaceholder') ? this.get('placeholder') : (this.get('_inputsNumber') === 0 ? this.get('placeholder') : '');
  }),

  i18nObserver: observer('i18n.locale', function() {
    this.get('i18n.locale');
    const error = this.get('_error');
    if (error) { set(error, 'full_message', this._get_message_error(error.label)); }
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
          full_message = 'this value is already used';
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
      if ((this.get('mustValidate') && this.get('validation')(input)) ||
          (this.get('uniqness') && (this.get('inputs') || A([])).filterBy('value', input)[0])) {
        return input;
      } else {
        this.get('inputs').addObject({ id: Symbol(), value: input });
        return null;
      }
    }).filter(a => a);
    const error_input = errors.join(" ");
    if (error_input !== values.join(" ")) { this._set_input_value(error_input); }
    if (errors.length > 0) {
      this._display_error(errors.length > 1 ? 'many_errors' : (this.get('validation')(errors[0]) || 'already_taken'), error_input);
    } else {
      this.set('_error', null);
      this._set_input_value("");
    }
  },

  _edit_input(id) {
    if (id) {
      const to_remove = this.get('inputs').findBy('id', id);
      if (to_remove) {
        this._set_input_value(to_remove.value);
        this.send('deleteInput', to_remove.id);
      }
    }
  },

  actions: {
    onInput(onInputEvent) {
      const prev_length = this.get('_prev_serach_length');
      if ((onInputEvent.srcElement.value || '').length > (prev_length + 1)) {
        this.set('_current_input', onInputEvent.srcElement.value);
        this._try_set_new_inputs(true);
      } else {
        this.set('_current_input', onInputEvent.srcElement.value);
      }
    },

    deleteInput(id) {
      const to_remove = this.get('inputs').findBy('id', id);
      this.get('inputs').removeObject(to_remove);
    },

    onBlur() {
      this._try_set_new_inputs();
    },

    onKeydown(event) {
      if ((this.get('onSpace') && event.keyCode === 13) || (this.get('onEnter') && event.keyCode === 32)) {
        this._try_set_new_inputs();
        return false;
      }
      if (event.keyCode === 8 && ((this.get('_current_input.length') || 0) === 0)) {
        this._edit_input(this.get('inputs.lastObject.id'));
      }
    },

    editInput(id) {
      this._edit_input(id);
      this.$('input')[0].focus();
    },

  },
});
define('ember-button/components/ember-button', ['exports', 'ember', 'ember-button/templates/components/ember-button'], function (exports, _ember, _emberButtonTemplatesComponentsEmberButton) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({

    layout: _emberButtonTemplatesComponentsEmberButton['default'],

    _buttonFinalClass: computed(function () {
      return 'action';
    }),

    setupButton: _ember['default'].on('didInsertElement', function () {
      // const type     = this.get('type'),
      //       mainType = type.split('.')[0],
      //       subtType = type.split('.')[1]
      // switch (mainType) {
      //   case 'action':
      //     switch()
      //     break;
      //   case '':
      //     break;
      //   default:
      // }
    }),

    teardownButton: _ember['default'].on('willDestroyElement', function () {
      console.log('button destroyed');
    })
  });
});
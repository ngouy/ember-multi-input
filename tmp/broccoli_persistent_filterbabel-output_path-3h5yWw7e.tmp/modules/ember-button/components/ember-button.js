import Ember from 'ember';
import layout from '../templates/components/ember-button';

export default Ember.Component.extend({

  layout: layout,

  _buttonFinalClass: computed(function () {
    return 'action';
  }),

  setupButton: Ember.on('didInsertElement', function () {
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

  teardownButton: Ember.on('willDestroyElement', function () {
    console.log('button destroyed');
  })
});
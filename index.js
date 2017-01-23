/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-multi-input',

  included(appOrAddon) {
    let app = appOrAddon.app || appOrAddon;
    
    this._super.included.apply(this, arguments);
    
    app.import('vendor/ember-multi-input.css');
  }
};

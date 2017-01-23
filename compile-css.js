/* global require, module */
var sass = require('node-sass');
var fs = require('fs');
var path = require('path');

var inputFile = path.join(__dirname, 'app', 'styles', 'ember-multi-input.scss');
var outputFile = path.join(__dirname, 'vendor', 'ember-multi-input.css');
var buf = fs.readFileSync(inputFile, "utf8");

// Compile main file
var result = sass.renderSync({
  data: buf,
  includePaths: ['app/styles']
});

fs.writeFileSync(outputFile, result.css);
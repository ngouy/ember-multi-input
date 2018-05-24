# Ember-multi-input

>**note**<br>
>this is my first addon
>it's in beta. All comments are welcome

## Presentation

ember-multi-input provides a simple helper which gives you a simple way to have a group of editable inputs such as a your list of emails when you send an email from your sending box
Easy to use on it's simpliest form, it can be used with some other params to custom thoose with validation, conditions, with simple errors  etc...
Currently works on ember 2.x, not tested yet on ember 1.13

## Installation

* `ember install ember-multi-input`<br>

>**or with npm run**<br>
>`npm install ember-multi-input --save-dev`

## Using
<h4> minal</h4>
```htmlbars
{{multi-input
  inputGroup=values
}}
```
<h4> avanced using</h4>
```htmlbars
  {{multi-input
    inputGroup=values
    validation=(action 'validationAction')
    type='email'
    uniqness=false
    max=30
    onEnter=true
    onSpace=false
    clearOnBlur=false
    alwaysShowPlaceholder=true
    placeholder='email'
    mustValidate=true
    valuesContainsSpaces=false
  }}
```

![alt tag](https://github.com/ngouy/images/blob/master/images_for_readme_repos/ember-multi-input/Screen%20Shot%202017-01-27%20at%2011.46.23.png?raw=true)
![alt tag](https://github.com/ngouy/images/blob/master/images_for_readme_repos/ember-multi-input/Screen%20Shot%202017-01-27%20at%2011.49.35.png?raw=true)

## The following outlines the details of collaborating on this Ember addon.
## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4242.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

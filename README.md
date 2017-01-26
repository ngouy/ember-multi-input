# Ember-multi-input

>**note**<br>
>this is my first addon
>it's in beta. All comments are welcome

## Presentation

ember-multi-input provides a simple helper which gives you a simple way to have a group of editable inputs such as a your list of emails when you send an email from your sending box
Easy to use on it's simpliest form, it can be used with some other params to custom thoose with validation, conditions, with simple errors  etc...

## Installation

* `ember install ember-multi-input`<br>

>**if you want to save it into your current ember project run**
>ember install ember-multi-input --save-dev

## Using
<h4> minal
```htmlbars
{{multi-input
  inputGroup=values
}}
```
<h4> avanced using
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
}}
```



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

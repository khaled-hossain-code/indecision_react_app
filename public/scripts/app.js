'use strict';

console.log('Inside src app');
var app = {
  title: 'Indecision App',
  subtitle: 'Your decision Computer will take',
  options: []
};
var appRoot = document.getElementById('app');

var removeAll = function removeAll() {
  app.options = [];
  renderApp();
};
var onFormSubmit = function onFormSubmit(e) {
  e.preventDefault();
  var option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    renderApp();
  }
};

var decide = function decide() {
  var randomNum = Math.floor(Math.random() * app.options.length);
  var option = app.options[randomNum];
  alert(option);
};

var renderApp = function renderApp() {
  var template = React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      app.title
    ),
    app.subtitle && React.createElement(
      'p',
      null,
      app.subtitle
    ),
    React.createElement(
      'p',
      null,
      app.options.length > 0 ? 'Here are your Options' : 'No options'
    ),
    React.createElement(
      'button',
      { disabled: app.options.length === 0, onClick: decide },
      'What Should I do? '
    ),
    React.createElement(
      'button',
      { onClick: removeAll },
      ' Remove All '
    ),
    React.createElement(
      'ul',
      null,
      app.options.map(function (opt) {
        return React.createElement(
          'li',
          { key: opt },
          opt
        );
      })
    ),
    React.createElement(
      'form',
      { onSubmit: onFormSubmit },
      React.createElement('input', { type: 'text', name: 'option' }),
      React.createElement(
        'button',
        null,
        ' Add Option '
      )
    )
  );

  ReactDOM.render(template, appRoot);
};

renderApp();

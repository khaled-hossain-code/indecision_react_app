'use strict';

console.log('Inside src app');

var appRoot = document.getElementById('app');
var template = React.createElement(
  'h1',
  null,
  'Babel can Watch!'
);

ReactDOM.render(template, appRoot);

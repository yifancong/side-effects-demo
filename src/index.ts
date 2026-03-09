import { render } from 'react-dom';
import { createElement } from 'react';

import { Button } from './components';
import { App } from './app1';

render(
  createElement(App, { name: 'Taylor' }),
  document.getElementById('root')!,
);

console.log('App started');
console.log('Button:', Button());

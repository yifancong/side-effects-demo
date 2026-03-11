import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Button } from './components';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// CJS require demo — triggers E1008 cjs-require rule warning
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cjsDemo = require('./cjs-require-demo');
console.log('App started');
console.log('Button:', Button());
console.log('CJS demo result:', cjsDemo.compute(1, 2));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

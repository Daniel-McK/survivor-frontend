import * as ReactDOM from 'react-dom';
import * as React from 'react';
import App from './scripts/components/general/App';
import { injectGlobal } from 'emotion';

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    height: 100vh;
    background: #F5FFFF;
  }
  *, * * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
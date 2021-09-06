import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from '@Models';
import { prefix } from '@Utils';

import App from './App';

const main = () => {
  const pf = prefix;

  let div = document.createElement('div');
  div.classList.add(`${pf}-parent`);

  document.body.appendChild(div);

  ReactDOM.render(
    <Provider>
      <App />
    </Provider>,
    div
  );
};

try {
  main();
} catch (err) {
  console.log(`%cmainF catch%c: ${err}`, 'background: #fff; color:  #f49cec;', 'color: #149cec;', err);
}

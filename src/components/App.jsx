import React from 'react';
import {Switch} from 'react-router';
import {Route} from 'react-router-dom';

import Main from './Main.jsx';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className = "container">
          <Main />
        </div>
      </div>
    );
  }

}

export default App;
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
          <Switch>
            <Route exact path='/' component={Main} />
          </Switch>
        </div>
      </div>
    );
  }

}

export default App;
import React from 'react';
import axios from 'axios';

import EmailFields from './EmailFields.jsx';
import InputTextField from './InputTextField.jsx';
import Banner from './Banner.jsx';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {recEmail: '', bodyText: ''};
    this.mailSubmit = this.mailSubmit.bind(this);
    this.updateVal = this.updateVal.bind(this);
  }

  mailSubmit(){
    axios({
      method: 'POST',
      url: '/mailSendAWS',
      data: {email: this.state.recEmail, body: this.state.bodyText}
    }).then((result) => {
      console.log('The mail was sent to the server successfully');
    }).catch((error) => {
      console.log('There was an error in the mailSubmit call: ', error);
    })
  }

  updateVal(name, event) {
    var updater = {};
    updater[name] = event.target.value;
    this.setState(updater);
  }

  render() {
    return (
      <div>
        <div className = "emailFields">
          <Banner />
          <EmailFields emailInput={this.updateVal}/>
          <InputTextField textAreaInput={this.updateVal}/>
          <button type="button" className="btn btn-primary" onClick={this.mailSubmit}>Send Mail</button>
        </div>
      </div>
    );
  }
}

export default Main;
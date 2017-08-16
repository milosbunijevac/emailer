import React from 'react';
import axios from 'axios';

import EmailField from './EmailField.jsx';
import InputTextField from './InputTextField.jsx';
import Banner from './Banner.jsx';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {recEmail: '', bodyText: ''};
    this.emailFieldChange = this.emailFieldChange.bind(this);
    this.inputTextChange = this.inputTextChange.bind(this);
    this.mailSubmit = this.mailSubmit.bind(this);
  }

  mailSubmit(){
    axios({
      method: 'POST',
      url: '/mailSend',
      data: {email: this.state.recEmail, body: this.state.bodyText}
    }).then((result) => {
      console.log('The mail was sent to the server successfully');
    }).catch((error) => {
      console.log('There was an error in the mailSubmit call: ', error);
    })
  }

  emailFieldChange (e) {
    this.setState({recEmail: e.target.value});
  }

  inputTextChange (e) {
    this.setState({bodyText: e.target.value});
  }

  render() {
    return (
      <div>
        <div className = "emailFields">
          <Banner />
          <EmailField emailInput={this.emailFieldChange}/>
          <InputTextField textAreaInput={this.inputTextChange}/>
          <button type="button" className="btn btn-primary" onClick={this.mailSubmit}>Send Mail</button>
        </div>
      </div>
    );
  }
}

export default Main;
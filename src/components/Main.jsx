import React from 'react';

import EmailField from './EmailField.jsx';
import InputTextField from './InputTextField.jsx';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {recEmail: '', bodyText: ''};
    this.emailFieldChange = this.emailFieldChange.bind(this);
    this.inputTextChange = this.inputTextChange.bind(this);
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
          <EmailField emailInput={this.emailFieldChange}/>
          <InputTextField textAreaInput={this.inputTextChange}/>
        </div>
      </div>
    );
  }
}

export default Main;
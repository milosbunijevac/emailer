import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import validator from 'email-validator';

import EmailFields from './EmailFields.jsx';
import InputTextField from './InputTextField.jsx';
import Banner from './Banner.jsx';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {recEmail: '', cc: '', bcc: '', subject: '', bodyText: '', testInput: false};
    this.mailSubmit = this.mailSubmit.bind(this);
    this.updateVal = this.updateVal.bind(this);
    this.stateCleaner = this.stateCleaner.bind(this);
  }

  stateCleaner(emails){
    var emailstoClean = [];
    _.forOwn(emails, (value, key) => {
      if(key !== 'testInput' && key !== 'subject' && key !== 'bodyText'){
        emailstoClean.push(...value.split(','))
      }
    })

    return emailstoClean
  }

  mailSubmit(){
    var emailstoCheck = this.stateCleaner(this.state).map((value) => {
      if(value !== ''){
        return value.replace(/ /g, '');
      }
    })
    
    var emailsFilter = emailstoCheck.filter((value) => {
      return value !== undefined
    })

    var validEmailBool = emailsFilter.every((currentValue) => {
      // Pulls subject too
      console.log('current val of validation: ', validator.validate(currentValue));
      return validator.validate(currentValue);
    })

    console.log('final value of email validation: ', validEmailBool);

    if(validEmailBool & this.state.recEmail !== '') {
      axios({
        method: 'POST',
        url: '/mailSend',
        data: {to: this.state.recEmail, messageBody: this.state.bodyText, cc: this.state.cc, bcc: this.state.bcc, subject: this.state.subject}
      }).then((result) => {
        alert('The mail was sent to the server successfully');
      }).catch((error) => {
        console.log('There was an error in the mailSubmit call: ', error);
      })
    } else {
      alert('You have an invalid email, please double check your inputs');
    }

  }

  updateVal(name, event) {
    var updater = {};
    updater[name] = event.target.value;
    this.setState(updater);
  }

  render() {
    return (
      <div>
        <div>
          <Banner />
          <div className = "inputButtonAll">
          <EmailFields emailInput={this.updateVal}/>
          <InputTextField textAreaInput={this.updateVal}/>
          <button type="button" className="btn btn-primary btnCust" onClick={this.mailSubmit}>Send Mail</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
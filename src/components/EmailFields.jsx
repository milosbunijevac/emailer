import React from 'react';

class EmailFields extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className = "inputFields">

        <h6 className = "inputWarn">Enter multiple email address seperated by a comma.</h6>
        <div className = "row">
          <h4 className = "col-md-1">To: </h4> 
          <input className = "addressField col-md-8" placeholder = "Enter recipients email..." type="email" required onChange={this.props.emailInput.bind(this, 'recEmail')}></input>
        </div>

        <div className = "row">
          <h4 className = "col-md-1">CC: </h4>
          <input className = "addressField col-md-8" placeholder = "CC" onChange={this.props.emailInput.bind(this, 'cc')}></input>
        </div>

        <div className = "row">
          <h4 className = "col-md-1">BCC: </h4>
          <input className = "addressField col-md-8" placeholder = "BCC" onChange={this.props.emailInput.bind(this, 'bcc')}></input>
        </div>

        <div className = "row">
          <h4 className = "col-md-1">Subject: </h4>
          <input className = "addressField col-md-8" placeholder = "Enter Subject..." onChange={this.props.emailInput.bind(this, 'subject')}></input>
        </div>

      </div>
    )
  }

}

export default EmailFields;

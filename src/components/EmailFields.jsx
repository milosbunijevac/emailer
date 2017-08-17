import React from 'react';

class EmailFields extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>

        <div className = "row">
          <h4 className = "col-md-1">To: </h4> 
          <input className = "addressField col-md-8" placeholder = "Enter recipients email..." onChange={this.props.emailInput.bind(this, 'recEmail')}></input>
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
          <h4 className = "col-md-1">Source: </h4>
          <input className = "addressField col-md-8" placeholder = "Source email address..." onChange={this.props.emailInput.bind(this, 'source')}></input>
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

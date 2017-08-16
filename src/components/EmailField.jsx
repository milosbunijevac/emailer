import React from 'react';

class EmailField extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
      <div>
        <div className = "row">
          <h4 className = "col-md-1">To: </h4> 
          <input className = "addressField col-md-8" placeholder = "Enter recipients email..." onChange={this.props.emailInput}></input>
        </div>
      </div>
    )
  }

}

export default EmailField;
